import { removeDialCode } from '../removeDialCode';

describe('removeDialCode', () => {
  test('should handle empty value', () => {
    expect(
      removeDialCode({
        phone: '',
        dial_code: '380',
      })
    ).toBe('');
  });

  test('should return passed value if it does not start with dial code', () => {
    expect(
      removeDialCode({
        phone: '+1 (234) 56',
        dial_code: '380',
      })
    ).toBe('+1 (234) 56');

    expect(
      removeDialCode({
        phone: '+1 (234) 567-890',
        dial_code: '1337',
      })
    ).toBe('+1 (234) 567-890');
  });

  test('should return value with removed dial code', () => {
    expect(
      removeDialCode({
        phone: '+380 (99) ',
        dial_code: '380',
      })
    ).toBe('(99) ');

    expect(
      removeDialCode({
        phone: '+1 (234) 567-8900',
        dial_code: '1',
      })
    ).toBe('(234) 567-8900');
  });

  test('should trim result value', () => {
    expect(
      removeDialCode({
        phone: '+1 (234) 567-8900',
        dial_code: '1',
      })
    ).toBe('(234) 567-8900');

    expect(
      removeDialCode({
        phone: '+380 (99) 123 45 67',
        dial_code: '380',
      })
    ).toBe('(99) 123 45 67');

    expect(
      removeDialCode({
        phone: '+380 (38) 097',
        dial_code: '380',
      })
    ).toBe('(38) 097');
  });

  test('should return passed value if dial_code is not in value', () => {
    expect(
      removeDialCode({
        phone: '+1 (234) 567-8900',
        dial_code: '123',
      })
    ).toBe('+1 (234) 567-8900');
  });

  test('should return passed value if dial_code is not provided', () => {
    expect(
      removeDialCode({
        phone: '+1 (234) 567-8900',
        dial_code: '',
      })
    ).toBe('+1 (234) 567-8900');

    expect(
      removeDialCode({
        phone: '+380 (99) 123 45 67',
        dial_code: '',
      })
    ).toBe('+380 (99) 123 45 67');
  });
});
