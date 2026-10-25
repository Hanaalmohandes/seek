import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { routes } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { LectureCard } from '../components/LectureCard';
import { Notice } from '../components/Notice';
import { WeekGrid } from '../components/WeekGrid';
import { DAYS, SAMPLE_TODAY, SAMPLE_WEEK, formatTime } from '../data/samples';
import { useSchedule } from '../hooks/useSchedule';
import type { Day } from '../types';

type Mode = 'day' | 'week';

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const { lectures, lecturesOn } = useSchedule();
  const [view, setView] = useState<Mode>('day');
  const [day, setDay] = useState<Day>(SAMPLE_TODAY);
  const [syncFailed, setSyncFailed] = useState(false);

  const dayLectures = lecturesOn(day);
  const dayInfo = DAYS.find((d) => d.id === day)!;

  return (
    <View className="flex-1 bg-paper">
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 110 }}
        contentContainerClassName="gap-5">
        <View className="flex-row items-end justify-between px-5">
          <View>
            <Text className="font-heavy text-3xl text-navy">Schedule</Text>
            <Text className="font-body text-sm text-slate">Week of {SAMPLE_WEEK}</Text>
          </View>
          <View className="flex-row rounded-full border border-line bg-surface p-1">
            {(['day', 'week'] as const).map((v) => {
              const active = v === view;
              return (
                <Pressable
                  key={v}
                  onPress={() => setView(v)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className={`rounded-full px-4 py-1.5 ${active ? 'bg-navy' : ''}`}>
                  <Text className={`font-semibold text-sm ${active ? 'text-white' : 'text-navy'}`}>
                    {v === 'day' ? 'Day' : 'Week'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="px-5">
          {syncFailed ? (
            <Notice
              title="Couldn’t sign in to Google Calendar"
              message="Check your connection and allow calendar access, then try again."
              actionLabel="Try again"
              onAction={() => setSyncFailed(false)}
            />
          ) : (
            <View className="flex-row items-center gap-3 rounded-2xl bg-navy px-4 py-3.5">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-navy-soft">
                <Ionicons name="logo-google" size={18} color={colors.gold} />
              </View>
              <View className="flex-1">
                <Text className="font-heavy text-base text-white">Google Calendar</Text>
                <Text className="font-body text-xs text-apricot">Not synced yet. Add your lectures to your calendar.</Text>
              </View>
              <Pressable
                onPress={() => setSyncFailed(true)}
                accessibilityRole="button"
                accessibilityLabel="Sync with Google Calendar"
                className="rounded-full bg-gold px-4 py-2 active:opacity-80">
                <Text className="font-heavy text-sm text-white">Sync</Text>
              </Pressable>
            </View>
          )}
        </View>
        {view === 'day' ? (
          <>
            <View className="flex-row gap-2 px-5">
              {DAYS.map((d) => {
                const active = d.id === day;
                const count = lecturesOn(d.id).length;
                return (
                  <Pressable
                    key={d.id}
                    onPress={() => setDay(d.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`${d.long}, ${count} classes`}
                    accessibilityState={{ selected: active }}
                    className={`flex-1 items-center gap-1 rounded-2xl border py-2.5 ${
                      active ? 'border-navy bg-navy' : 'border-line bg-surface'
                    }`}>
                    <Text className={`font-semibold text-xs ${active ? 'text-apricot' : 'text-slate'}`}>{d.short}</Text>
                    <Text className={`font-heavy text-lg ${active ? 'text-white' : 'text-navy'}`}>{d.date}</Text>
                    <View className="flex-row gap-0.5">
                      {Array.from({ length: count }, (_, i) => (
                        <View key={i} className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-gold' : 'bg-line'}`} />
                      ))}
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View className="px-5">
              <Text className="font-heavy text-lg text-navy">
                {day === SAMPLE_TODAY ? 'Today' : dayInfo.long}
              </Text>
              <Text className="font-body text-sm text-slate">
                {dayLectures.length === 0
                  ? 'No classes'
                  : `${dayLectures.length} classes, ${formatTime(dayLectures[0].start)} – ${formatTime(
                      dayLectures[dayLectures.length - 1].end,
                    )}`}
              </Text>
            </View>
            <View className="gap-3 px-5">
              {dayLectures.length === 0 ? (
                <View className="items-center gap-2 rounded-md border border-dashed border-line py-10">
                  <Ionicons name="cafe-outline" size={28} color={colors.gold} />
                  <Text className="font-semibold text-base text-navy">A free day</Text>
                  <Text className="font-body text-sm text-slate">Tap + to add a lecture or lab.</Text>
                </View>
              ) : (
                dayLectures.map((l, i) => (
                  <LectureCard key={l.id} lecture={l} now={day === SAMPLE_TODAY && i === 0} />
                ))
              )}
            </View>
          </>
        ) : (
          <View className="mx-5 rounded-md border border-line bg-surface p-3">
            <WeekGrid lectures={lectures} today={SAMPLE_TODAY} />
            <View className="mt-3 flex-row justify-center gap-4 border-t border-line pt-3">
              {[
                ['Lecture', colors.navy],
                ['Lab', colors.gold],
                ['Tutorial', colors.apricot],
              ].map(([label, color]) => (
                <View key={label} className="flex-row items-center gap-1.5">
                  <View style={{ backgroundColor: color }} className="h-3 w-3 rounded-sm" />
                  <Text className="font-body text-xs text-slate">{label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{ bottom: insets.bottom + 20 }} className="absolute right-5">
        <Link href={routes.lectureForm()} asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add lecture"
            className="flex-row items-center gap-2 rounded-full bg-navy px-5 py-4 shadow-lg active:bg-navy-soft">
            <Ionicons name="add" size={22} color={colors.gold} />
            <Text className="font-heavy text-base text-white">Add</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
