// Design tokens: every colour, spacing step, radius and font lives here (Lab 03, Part 2).
// tailwind.config.js reads this file too, so NativeWind classes like `bg-navy` or `rounded-md`
// and the SVG map always use the same values.

// BUE-inspired palette: navy primary with a blond-gold accent.
export const colors = {
  navy: '#0A2240', // primary — buttons, building walls, headings
  'navy-soft': '#1C3A63', // pressed / selected navy
  gold: '#D4A23A', // accent — route line, plates, icons
  apricot: '#F7DDB2', // soft highlight behind gold elements
  paper: '#F5F7FA', // screen background
  surface: '#FFFFFF', // cards and sheets
  ground: '#E4EAF1', // map ground
  lawn: '#CFDFC4', // map green areas
  slate: '#55657A', // secondary text
  line: '#D5DDE7', // borders and dividers
  danger: '#C2410C', // errors
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 8, md: 14, lg: 20, pill: 999 } as const;

export const fonts = {
  body: 'Overpass_400Regular',
  semibold: 'Overpass_600SemiBold',
  heavy: 'Overpass_800ExtraBold',
} as const;

// Short aliases for places Tailwind classes can't reach (SVG drawings, icon colours).
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
