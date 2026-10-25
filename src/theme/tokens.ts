export const colors = {
  navy: '#0A2240',
  'navy-soft': '#1C3A63',
  gold: '#D73738',
  apricot: '#FDE8E9',
  paper: '#F5F7FA',
  surface: '#FFFFFF',
  ground: '#E4EAF1',
  lawn: '#CFDFC4',
  slate: '#55657A',
  line: '#D5DDE7',
  danger: '#C2410C', // errors
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 8, md: 14, lg: 20, pill: 999 } as const;

export const fonts = {
  body: 'Overpass_400Regular',
  semibold: 'Overpass_600SemiBold',
  heavy: 'Overpass_800ExtraBold',
} as const;

export const C = {
  navy: colors.navy,
  navySoft: colors['navy-soft'],
  gold: colors.gold,
  apricot: colors.apricot,
  paper: colors.paper,
  ground: colors.ground,
  lawn: colors.lawn,
  slate: colors.slate,
  line: colors.line,
  white: colors.surface,
};
export const FONT = fonts;
