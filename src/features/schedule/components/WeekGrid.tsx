import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { routes } from '@/navigation/types';

import { DAYS, toMinutes } from '../data/samples';
import type { Day, Lecture } from '../types';
import { TYPE_COLORS } from './TypeBadge';

const FIRST_HOUR = 9;
const LAST_HOUR = 16;
const HOUR_HEIGHT = 58;

type Props = { lectures: Lecture[]; today: Day };

export function WeekGrid({ lectures, today }: Props) {
  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i);
  const height = (LAST_HOUR - FIRST_HOUR) * HOUR_HEIGHT;

  return (
    <View className="gap-2">
      <View className="flex-row pl-9">
        {DAYS.map((d) => {
          const isToday = d.id === today;
          return (
            <View key={d.id} className="flex-1 items-center">
              <Text className={`font-semibold text-xs ${isToday ? 'text-navy' : 'text-slate'}`}>{d.short}</Text>
              <View
                className={`mt-0.5 h-7 w-7 items-center justify-center rounded-full ${isToday ? 'bg-navy' : ''}`}>
                <Text className={`font-heavy text-sm ${isToday ? 'text-white' : 'text-navy'}`}>{d.date}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View className="flex-row" style={{ height: height + 8 }}>
        <View className="w-9">
          {hours.map((h) => (
            <Text
              key={h}
              style={{ position: 'absolute', top: (h - FIRST_HOUR) * HOUR_HEIGHT - 6 }}
              className="font-body text-[10px] text-slate">
              {h > 12 ? h - 12 : h}
              {h >= 12 ? 'pm' : 'am'}
            </Text>
          ))}
        </View>
        <View className="flex-1 flex-row">
          {hours.map((h) => (
            <View
              key={h}
              style={{ position: 'absolute', left: 0, right: 0, top: (h - FIRST_HOUR) * HOUR_HEIGHT }}
              className="h-px bg-line"
            />
          ))}

          {DAYS.map((d) => (
            <View
              key={d.id}
              className={`flex-1 border-l border-line ${d.id === today ? 'bg-apricot/25' : ''}`}
              style={{ height }}>
              {lectures
                .filter((l) => l.day === d.id)
                .map((l) => {
                  const top = ((toMinutes(l.start) - FIRST_HOUR * 60) / 60) * HOUR_HEIGHT;
                  const blockHeight = ((toMinutes(l.end) - toMinutes(l.start)) / 60) * HOUR_HEIGHT - 3;
                  const c = TYPE_COLORS[l.type];
                  return (
                    <Link key={l.id} href={routes.lecture({ id: l.id })} asChild>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${l.courseName} ${l.type}, ${d.long} ${l.start}`}
                        style={{
                          position: 'absolute',
                          top,
                          left: 2,
                          right: 2,
                          height: blockHeight,
                          backgroundColor: c.bg,
                        }}
                        className="rounded-sm px-1.5 py-1 active:opacity-80">
                        <Text style={{ color: c.text }} className="font-heavy text-[11px]" numberOfLines={1}>
                          {l.courseCode}
                        </Text>
                        <Text style={{ color: c.text, opacity: 0.85 }} className="font-body text-[10px]" numberOfLines={2}>
                          {l.room}
                        </Text>
                      </Pressable>
                    </Link>
                  );
                })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
