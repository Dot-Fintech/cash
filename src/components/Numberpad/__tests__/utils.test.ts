import { popValue, pushValue } from '../utils';

describe('Push value', () => {
  it('should do nothing when we push 0 to 0', () => {
    expect(pushValue(0, 0)).toEqual(0);
  });

  it('should push a non zero digit', () => {
    expect(pushValue(0, 4)).toEqual(0.04);
  });

  it('should push a non zero digit to an existing number', () => {
    expect(pushValue(12.23, 3)).toEqual(122.33);
  });

  it('should push a zero to an existing number', () => {
    expect(pushValue(12.23, 0)).toEqual(122.3);
  });

  it('should handle multiple pushes', () => {
    expect(pushValue(pushValue(pushValue(0, 1), 0), 1)).toEqual(1.01);
  });
});

describe('Pop value', () => {
  it('should do nothing when the value is 0', () => {
    expect(popValue(0)).toEqual(0);
  });

  it('should pop the cents value', () => {
    expect(popValue(15.66)).toEqual(1.56);
  });

  it('should pop and have cents only', () => {
    expect(popValue(5.63)).toEqual(0.56);
  });

  it('should pop the 0 and have cents', () => {
    expect(popValue(0.5)).toEqual(0.05);
  });

  it('should pop cents and return to 0', () => {
    expect(popValue(0.05)).toEqual(0);
  });

  it('should pop the 0 and maintain the dollar value', () => {
    expect(popValue(20.0)).toEqual(2);
  });

  it('should pop when there are less significant numbers', () => {
    expect(popValue(10.00000001)).toEqual(1);
  });

  it('should pop the correct value when there are less significant numbers', () => {
    expect(popValue(10.06000001)).toEqual(1);
  });

  it('should handle a pop into hundredths', () => {
    expect(popValue(10.1)).toEqual(1.01);
  });

  it('should handle double pops', () => {
    expect(popValue(popValue(10.1))).toEqual(0.1);
  });
});
