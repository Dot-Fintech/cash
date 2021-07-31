import React from 'react';

type IconProps = {
  width?: number;
  height?: number;
};

export type VectorIcon = {
  src: React.ComponentType<IconProps>;
  /** aspect ratio (width / height) */
  AR: number;
};

export type DesiredIconDimensions = IconProps & {
  maxWidth?: number;
  maxHeight?: number;
};
