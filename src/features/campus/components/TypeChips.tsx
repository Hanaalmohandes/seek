import type Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native';

import { Chip } from '@/components/ui/Chip';

import { LOCATION_TYPES, TYPE_META } from '../data/locations';
import type { LocationType } from '../types';

type Props = {
  value: LocationType | null;
  onChange: (type: LocationType | null) => void;
};

export function TypeChips({ value, onChange }: Props) {
  const options: (LocationType | null)[] = [null, ...LOCATION_TYPES];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-5">
      {options.map((type) => (
        <Chip
          key={type ?? 'all'}
          label={type ? TYPE_META[type].label : 'All'}
          icon={type ? (TYPE_META[type].icon as keyof typeof Ionicons.glyphMap) : undefined}
          selected={value === type}
          onPress={() => onChange(type)}
        />
      ))}
    </ScrollView>
  );
}
