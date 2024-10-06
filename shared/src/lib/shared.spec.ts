import { isTimeInInterval } from './shared';

describe('isTimeInInterval', () => {
  it('should work', () => {
    expect(isTimeInInterval('10:00', '09:00', '11:00')).toBe(true)
  });
});
