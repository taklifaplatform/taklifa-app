import { addDialCode } from '../addDialCode'

describe('addDialCode', () => {
  test('should handle empty value', () => {
    expect(
      addDialCode({
        phone: '',
        dial_code: '380',
      })
    ).toBe('+380 ')
  })

  test('should add dial code', () => {
    expect(
      addDialCode({
        phone: '(234) 56',
        dial_code: '1',
      })
    ).toBe('+1 (234) 56')

    expect(
      addDialCode({
        phone: '(99) ',
        dial_code: '380',
      })
    ).toBe('+380 (99) ')

    expect(
      addDialCode({
        phone: '(33) 333',
        dial_code: '33',
      })
    ).toBe('+33 (33) 333')
  })

  test('should prevent dial code duplicate', () => {
    expect(
      addDialCode({
        phone: '+1 (234) 56',
        dial_code: '1',
      })
    ).toBe('+1 (234) 56')

    expect(
      addDialCode({
        phone: '+380 (99) ',
        dial_code: '380',
      })
    ).toBe('+380 (99) ')

    expect(
      addDialCode({
        phone: '+33 (33) 333',
        dial_code: '33',
      })
    ).toBe('+33 (33) 333')
  })
})
