import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { routes } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { formatTime } from '../data/samples';
import type { Lecture } from '../types';
import { TYPE_COLORS, TypeBadge } from './TypeBadge';

export function LectureCard({ lecture, now = false }: { lecture: Lecture; now?: boolean }) {
  return (
    <Link href={routes.lecture({ id: lecture.id })} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${lecture.courseName} ${lecture.type}, ${formatTime(lecture.start)}, room ${lecture.room}`}
        className="flex-row gap-3 active:opacity-80">
        <View className="w-16 pt-3">
          <Text className="font-heavy text-sm text-navy">{formatTime(lecture.start)}</Text>
          <Text className="font-body text-xs text-slate">{formatTime(lecture.end)}</Text>
        </View>
        <View
          className={`flex-1 flex-row overflow-hidden rounded-md border bg-surface ${
            now ? 'border-gold' : 'border-line'
          }`}>
          <View style={{ width: 6, backgroundColor: TYPE_COLORS[lecture.type].bar }} />
          <View className="flex-1 gap-1.5 p-3">
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-xs text-slate">{lecture.courseCode}</Text>
              <TypeBadge type={lecture.type} />
              {now && (
                <View className="rounded-full bg-gold px-2 py-0.5">
                  <Text className="font-heavy text-[10px] text-white">NEXT</Text>
                </View>
              )}
            </View>
            <Text className="font-heavy text-base text-navy" numberOfLines={1}>
              {lecture.courseName}
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="location-outline" size={14} color={colors.gold} />
                <Text className="font-body text-sm text-slate">{lecture.room}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons
                  name={lecture.reminderMinutes === null ? 'notifications-off-outline' : 'notifications-outline'}
                  size={14}
                  color={colors.slate}
                />
                <Text className="font-body text-sm text-slate">
                  {lecture.reminderMinutes === null ? 'No reminder' : `${lecture.reminderMinutes} min`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
