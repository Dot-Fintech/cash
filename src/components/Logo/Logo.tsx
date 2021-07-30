import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

type Props = {
  size: number;
};

const Logo: React.FC<Props> = ({ size }) => {
  const radius = size / 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Circle
        cx={radius}
        cy={radius}
        r={radius}
        transform={`rotate(-45 ${radius} ${radius})`}
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={radius}
          y1={0.147790055 * size}
          x2={radius}
          y2={0.854972376 * size}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00D2D3" />
          <Stop offset="1" stopColor="#1289A7" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Logo;
