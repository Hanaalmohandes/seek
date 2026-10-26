import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, type PropsWithChildren } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { useLocations } from '@/features/campus';
import { routes, type LectureFormParams } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { Notice } from '../components/Notice';
import { DAYS, REMINDER_OPTIONS, ROOM_SUGGESTIONS, SAMPLE_DRAFT, SAMPLE_ERRORS, TYPE_META } from '../data/samples';
import { useSchedule } from '../hooks/useSchedule';
import type { LectureType } from '../types';
import { formatTime } from '../utils/time';

function Field({ label, error, children }: PropsWithChildren<{ label: string; error?: string | false }>) {
  return (
    <View className="gap-2">
      <Text className="font-semibold text-sm text-slate">{label}</Text>
      {children}
      {error && (
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text className="flex-1 font-body text-xs text-danger">{error}</Text>
        </View>
      )}
    </View>
  );
}

function TimeBox({ label, value, error }: { label: string; value: string; error: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} ${formatTime(value)}`}
      className={`flex-1 gap-0.5 rounded-md border-2 bg-surface px-4 py-2.5 active:opacity-80 ${
        error ? 'border-danger' : 'border-navy'
      }`}>
      <Text className="font-body text-xs text-slate">{label}</Text>
      <View className="flex-row items-center gap-2">
        <Ionicons name="time-outline" size={18} color={colors.gold} />
        <Text className="font-heavy text-lg text-navy">{formatTime(value)}</Text>
      </View>
    </Pressable>
  );
}

export default function LectureFormScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<LectureFormParams>();
  const { getLecture } = useSchedule();
  const { getLocation, getBuilding } = useLocations();

  const editing = id ? getLecture(id) : undefined;
  const start = editing ?? SAMPLE_DRAFT;

  const [courseCode, setCourseCode] = useState(start.courseCode);
  const [courseName, setCourseName] = useState(start.courseName);
  const [type, setType] = useState<LectureType>(start.type);
  const [room, setRoom] = useState(start.room);
  const [roomLocationId, setRoomLocationId] = useState(editing?.locationId ?? null);
  const [day, setDay] = useState(start.day);
  const [reminder, setReminder] = useState<number | null>(start.reminderMinutes);
  const [reminderTouched, setReminderTouched] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const roomPlace = roomLocationId ? getLocation(roomLocationId) : undefined;
  const roomBuilding = roomPlace ? getBuilding(roomPlace.buildingId) : undefined;

  const errors = showErrors && !editing ? SAMPLE_ERRORS : null;

  const onSave = () => {
    if (!editing) return setShowErrors(true);
    if (!saveFailed) return setSaveFailed(true);
    router.back();
  };

  return (
    <View className="flex-1 bg-paper">
      <View style={{ paddingTop: insets.top + 8 }} className="flex-row items-center gap-3 px-5 pb-3">
        <IconButton icon="close" label="Close without saving" onPress={() => router.back()} />
        <View className="flex-1">
          <Text className="font-heavy text-2xl text-navy">{editing ? 'Edit lecture' : 'Add lecture'}</Text>
          <Text className="font-body text-sm text-slate">
            {editing ? `${editing.courseCode} ${editing.courseName}` : 'A lecture, lab or tutorial'}
          </Text>
        </View>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        contentContainerClassName="gap-5 px-5 pt-2"
        keyboardShouldPersistTaps="handled">
        {errors && (
          <Notice
            title="Please fix 4 things before saving"
            message="The highlighted fields need your attention."
          />
        )}
        {saveFailed && (
          <Notice
            title="Couldn’t save your changes"
            message="Check your connection and press Save again."
            icon="cloud-offline-outline"
          />
        )}

        <Field label="Course" error={errors?.course}>
          <Input
            value={courseCode}
            onChangeText={setCourseCode}
            placeholder="Course code, e.g. CS 301"
            icon="book-outline"
            error={!!errors}
            autoCapitalize="characters"
          />
          <Input
            value={courseName}
            onChangeText={setCourseName}
            placeholder="Course name"
            icon="text-outline"
            error={!!errors}
          />
        </Field>
        <Field label="Type">
          <View className="flex-row gap-2">
            {(Object.keys(TYPE_META) as LectureType[]).map((t) => (
              <Chip
                key={t}
                label={TYPE_META[t].label}
                icon={TYPE_META[t].icon as keyof typeof Ionicons.glyphMap}
                selected={t === type}
                onPress={() => setType(t)}
              />
            ))}
          </View>
        </Field>
        <Field label="Room" error={errors?.room}>
          <Input
            value={room}
            onChangeText={(text) => {
              setRoom(text);
              setRoomLocationId(null);
            }}
            placeholder="Room, e.g. H-201"
            icon="location-outline"
            error={!!errors}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {ROOM_SUGGESTIONS.map((r) => (
              <Chip
                key={r.room}
                label={r.label}
                selected={r.room === room}
                onPress={() => {
                  setRoom(r.room);
                  setRoomLocationId(r.locationId);
                }}
              />
            ))}
          </ScrollView>
          {roomBuilding && (
            <View className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={16} color={colors.gold} />
              <Text className="font-body text-sm text-slate">
                On the campus map: {roomBuilding.title}, {roomPlace?.name}
              </Text>
            </View>
          )}
        </Field>
        <Field label="Day">
          <View className="flex-row flex-wrap gap-2">
            {DAYS.map((d) => (
              <Chip key={d.id} label={d.short} selected={d.id === day} onPress={() => setDay(d.id)} />
            ))}
          </View>
        </Field>
        <Field label="Time" error={errors ? `${errors.time} ${errors.overlap}` : false}>
          <View className="flex-row items-center gap-3">
            <TimeBox label="Starts" value={start.start} error={!!errors} />
            <Ionicons name="arrow-forward" size={18} color={colors.slate} />
            <TimeBox label="Ends" value={start.end} error={!!errors} />
          </View>
        </Field>
        <Field label="Remind me">
          <View className="flex-row flex-wrap gap-2">
            {REMINDER_OPTIONS.map((m) => (
              <Chip
                key={String(m)}
                label={m === null ? 'Off' : `${m} min`}
                icon={m === null ? 'notifications-off-outline' : 'notifications-outline'}
                selected={m === reminder}
                onPress={() => {
                  setReminder(m);
                  setReminderTouched(true);
                }}
              />
            ))}
          </View>
          {reminderTouched && reminder !== null && (
            <Notice
              title="Notifications are turned off for Seek"
              message="Allow notifications in Settings to get lecture reminders."
              icon="notifications-off-outline"
              actionLabel="Settings"
            />
          )}
        </Field>
        <View className="gap-3 pt-2">
          <AppButton label={editing ? 'Save changes' : 'Save lecture'} icon="checkmark" onPress={onSave} />
          {editing && (
            <Pressable
              onPress={() => router.replace(routes.schedule())}
              accessibilityRole="button"
              className="flex-row items-center justify-center gap-2 rounded-md py-3 active:bg-danger/10">
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
              <Text className="font-heavy text-base text-danger">Delete lecture</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
