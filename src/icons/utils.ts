import { DesiredIconDimensions } from './types';

type Result = { width: number; height: number };

type CalculateIconDimensionsArg = {
  AR: number;
  width?: number;
  height?: number;
};

const calculateIconDimensions = ({
  AR,
  width,
  height,
}: CalculateIconDimensionsArg): Result => ({
  width: width ? width : Math.floor((height ?? 0) * AR),
  height: height ? height : Math.floor((width ?? 0) / AR),
});

type GetIconDimensionsArg = DesiredIconDimensions & {
  AR: number;
};

/** Uses the height or width and the AR.
 * If the size exceeds any of the limits, then we recalculate using the limits
 */
export const getIconDimensions = ({
  AR,
  width,
  height,
  maxWidth,
  maxHeight,
}: GetIconDimensionsArg): Result => {
  const dimensions = calculateIconDimensions({ AR, width, height });

  if (maxWidth && dimensions.width > maxWidth) {
    return calculateIconDimensions({ AR, width: maxWidth });
  }

  if (maxHeight && dimensions.height > maxHeight) {
    return calculateIconDimensions({ AR, height: maxHeight });
  }

  return dimensions;
};
