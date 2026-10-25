import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { colors, fonts } from '@/theme/tokens';

import type { Building } from '../types';
import { Bush, Lamp, Tree } from './MapScenery';

const WALL = '#0A2240';
const WALL_SIDE = '#071A33';
const ROOF = '#24456F';
const WINDOW_LIT = '#FDE8E9';
const WINDOW_DARK = '#2B4A73';

type Props = { building: Building };

export function BuildingHero({ building }: Props) {
  const isBus = building.kind === 'area';
  const isFoodCourt = building.id === '16';
  const codeW = Math.max(34, 18 + building.code.length * 13);

  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice">
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#CFDDEE" />
          <Stop offset="1" stopColor="#F2F5F9" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={400} height={240} fill="url(#sky)" />
      <G fill={colors.surface} opacity={0.85}>
        <Ellipse cx={70} cy={46} rx={26} ry={9} />
        <Ellipse cx={88} cy={40} rx={16} ry={9} />
        <Ellipse cx={320} cy={30} rx={22} ry={7} />
        <Ellipse cx={336} cy={25} rx={13} ry={7} />
      </G>
      <Rect x={0} y={188} width={400} height={52} fill="#BFD7AE" />
      <Rect x={0} y={188} width={400} height={6} fill="#A9C893" />
      <Path d="M182 192 L218 192 L250 240 L150 240 Z" fill="#E7ECF2" />
      <Path d="M182 192 L218 192 L222 198 L178 198 Z" fill="#CBD4DF" />
      {isBus ? (
        <G>
          <Rect x={70} y={150} width={260} height={46} rx={6} fill="#D3DAE4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Rect key={i} x={86 + i * 40} y={154} width={3} height={14} fill={colors.surface} />
          ))}
          <Ellipse cx={200} cy={192} rx={96} ry={8} fill={WALL} opacity={0.2} />
          <Rect x={110} y={112} width={180} height={70} rx={14} fill="#A9232C" />
          <Rect x={110} y={108} width={180} height={34} rx={14} fill={colors.gold} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Rect key={i} x={124 + i * 30} y={118} width={22} height={18} rx={3} fill="#EAF2FA" />
          ))}
          <Rect x={266} y={118} width={16} height={46} rx={3} fill="#EAF2FA" />
          <Circle cx={145} cy={184} r={13} fill={WALL} />
          <Circle cx={145} cy={184} r={5} fill="#8E9AAB" />
          <Circle cx={255} cy={184} r={13} fill={WALL} />
          <Circle cx={255} cy={184} r={5} fill="#8E9AAB" />
        </G>
      ) : (
        <G>
          <Ellipse cx={208} cy={192} rx={130} ry={9} fill={WALL} opacity={0.18} />
          <Path d="M300 64 L322 76 L322 192 L300 192 Z" fill={WALL_SIDE} />
          <Rect x={92} y={64} width={208} height={128} fill={WALL} />
          <Rect x={86} y={52} width={220} height={14} rx={3} fill={ROOF} />
          <Path d="M306 52 L328 64 L328 76 L306 66 Z" fill="#1B3657" />
          {[0, 1, 2].map((floor) =>
            Array.from({ length: 8 }, (_, i) => {
              const x = 106 + i * 24;
              const y = 78 + floor * 30;
              if (floor === 2 && i >= 3 && i <= 4) return null;
              const lit = (floor * 3 + i) % 4 !== 1;
              return (
                <G key={`${floor}-${i}`}>
                  <Rect x={x} y={y} width={14} height={18} rx={2} fill={lit ? WINDOW_LIT : WINDOW_DARK} />
                  <Rect x={x} y={y + 8} width={14} height={1.5} fill={WALL} opacity={0.4} />
                </G>
              );
            }),
          )}

          {isFoodCourt && (
            <G>
              {Array.from({ length: 13 }, (_, i) => (
                <Rect
                  key={i}
                  x={92 + i * 16}
                  y={132}
                  width={16}
                  height={10}
                  fill={i % 2 ? colors.surface : colors.gold}
                />
              ))}
            </G>
          )}

          <Rect x={168} y={140} width={64} height={6} rx={2} fill={colors.gold} />
          <Rect x={178} y={146} width={44} height={46} rx={3} fill={colors.gold} />
          <Rect x={182} y={150} width={17} height={42} rx={2} fill="#1C3A63" />
          <Rect x={201} y={150} width={17} height={42} rx={2} fill="#1C3A63" />
          <Rect x={200 - codeW / 2} y={30} width={codeW} height={24} rx={12} fill={colors.gold} />
          <SvgText x={200} y={47} fontSize={15} fontFamily={fonts.heavy} fill={colors.surface} textAnchor="middle">
            {building.code}
          </SvgText>
        </G>
      )}

      <Tree x={44} y={160} r={26} />
      <Tree x={356} y={158} r={24} />
      <Tree x={20} y={180} r={14} />
      <Bush x={120} y={190} r={9} />
      <Bush x={282} y={190} r={9} />
      <Lamp x={160} y={196} />
      <Lamp x={240} y={196} />
    </Svg>
  );
}
