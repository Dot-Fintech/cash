const formatRGBValue = (value: number) => {
  if (value <= 0) return 0;
  else if (value >= 255) return 255;
  else return value;
};

const formatOpacity = (value?: number) => {
  if (value === undefined || value >= 1) return 1;
  else if (value <= 0) return 0;
  else return value;
};

export class Color {
  public readonly r!: number;
  public readonly g!: number;
  public readonly b!: number;
  public readonly opacity?: number;

  constructor(init: Pick<Color, 'r' | 'g' | 'b' | 'opacity'>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return `rgba(${formatRGBValue(this.r)}, ${formatRGBValue(
      this.g,
    )}, ${formatRGBValue(this.b)}, ${formatOpacity(this.opacity)})`;
  }
}

export type ColorSettings = {
  primary: Color;
  secondary: Color;
};

export type ThemeColors = {
  background: ColorSettings;
  main: ColorSettings;
  text: ColorSettings;
  textLink: ColorSettings;
  success: ColorSettings;
  warning: ColorSettings;
  error: ColorSettings;
};
