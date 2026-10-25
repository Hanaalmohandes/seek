import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { BuildingPlate } from '@/features/campus/components/BuildingPlate';
import { BuildingHero } from '@/features/campus/components/BuildingHero';
import { useLocations } from '@/features/campus/hooks/useLocations';
import { routes, type LectureParams } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { TypeBadge } from '../components/TypeBadge';
import { DAYS, formatTime, reminderLabel, toMinutes } from '../data/samples';
import { useSchedule } from '../hooks/useSchedule';

function Fact({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <Card variant="muted" className="flex-1 gap-1">
      <Ionicons name={icon} size={18} color={colors.gold} />
      <Text className="font-body text-xs text-slate">{label}</Text>
      <Text className="font-semibold text-sm text-navy" numberOfLines={2}>
        {value}
      </Text>
    </Card>
  );
}

export default function LectureDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<LectureParams>();
  const { getLecture } = useSchedule();
  const { getLocation, getBuilding } = useLocations();
  const lecture = getLecture(id);

  if (!lecture) {
    return (
      <View style={{ paddingTop: insets.top + 8 }} className="flex-1 bg-paper px-5">
        <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
        <View className="flex-1 items-center justify-center gap-3 px-4">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-apricot">
            <Ionicons name="calendar-outline" size={28} color={colors.navy} />
          </View>
          <Text className="text-center font-heavy text-xl text-navy">This lecture isn’t in your schedule</Text>
          <Text className="text-center font-body text-sm text-slate">It may have been deleted.</Text>
          <View className="mt-2">
            <AppButton label="Back to schedule" icon="calendar-outline" onPress={() => router.replace(routes.schedule())} />
          </View>
        </View>
      </View>
    );
  }

  const place = getLocation(lecture.locationId);
  const building = place ? getBuilding(place.buildingId) : undefined;
  const day = DAYS.find((d) => d.id === lecture.day)!;
  const minutes = toMinutes(lecture.end) - toMinutes(lecture.start);
  const remindAt =
    lecture.reminderMinutes === null
      ? null
      : (() => {
          const t = toMinutes(lecture.start) - lecture.reminderMinutes;
          return formatTime(`${Math.floor(t / 60)}:${t % 60}`);
        })();

  return (
    <View className="flex-1 bg-paper">
      <View style={{ paddingTop: insets.top + 8 }} className="gap-5 bg-navy px-5 pb-10">
        <View className="flex-row justify-between">
          <IconButton icon="arrow-back" label="Go back" onPress={() => router.back()} />
          <Link href={routes.lectureForm({ id: lecture.id })} asChild>
            <IconButton icon="create-outline" label="Edit lecture" onPress={() => {}} />
          </Link>
        </View>
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-sm text-apricot">{lecture.courseCode}</Text>
            <TypeBadge type={lecture.type} onDark />
          </View>
          <Text className="font-heavy text-3xl text-white">{lecture.courseName}</Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar-clear-outline" size={16} color={colors.gold} />
            <Text className="font-semibold text-base text-white">
              {day.long}, {formatTime(lecture.start)} – {formatTime(lecture.end)}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        className="-mt-6 flex-1 rounded-t-3xl border-t border-line bg-surface"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        contentContainerClassName="gap-5 px-5 pt-6">
        <View className="flex-row gap-3">
          <Fact icon="person-outline" label="Lecturer" value={lecture.lecturer} />
          <Fact icon="hourglass-outline" label="Duration" value={`${minutes} min`} />
          <Fact icon="repeat-outline" label="Repeats" value={`Every ${day.short}`} />
        </View>
        <View className="gap-3">
          <Text className="font-heavy text-lg text-navy">Where</Text>
          <View className="overflow-hidden rounded-md border border-line">
            {building && (
              <View style={{ height: 190 }}>
                <BuildingHero building={building} />
              </View>
            )}
            <View className="flex-row items-center gap-3 bg-surface p-3">
              {building && <BuildingPlate code={building.code} size="md" />}
              <View className="flex-1">
                <Text className="font-heavy text-base text-navy">Room {lecture.room}</Text>
                <Text className="font-body text-sm text-slate">
                  {building ? `${building.title}, ${place?.name}` : 'Not on the campus map'}
                </Text>
              </View>
            </View>
          </View>
          <Link href={routes.directions({ id: lecture.locationId })} asChild>
            <AppButton label="Directions to room" icon="walk" />
          </Link>
        </View>
        <View className="gap-3">
          <Text className="font-heavy text-lg text-navy">Reminder</Text>
          <Card className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-apricot">
              <Ionicons
                name={lecture.reminderMinutes === null ? 'notifications-off-outline' : 'notifications'}
                size={20}
                color={colors.navy}
              />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-base text-navy">{reminderLabel(lecture.reminderMinutes)}</Text>
              <Text className="font-body text-sm text-slate">
                {remindAt ? `You’ll get a notification at ${remindAt}` : 'No notification for this class'}
              </Text>
            </View>
          </Card>
        </View>
        <Link href={routes.lectureForm({ id: lecture.id })} asChild>
          <AppButton label="Edit lecture" icon="create-outline" variant="secondary" />
        </Link>
      </ScrollView>
    </View>
  );
}
