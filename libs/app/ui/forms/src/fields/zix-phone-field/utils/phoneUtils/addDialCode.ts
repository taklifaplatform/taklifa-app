import { removeDialCode } from './removeDialCode'

interface AddDialCodeProps {
  phone: string
  dial_code: string
  prefix?: string
  charAfterDialCode?: string
}

export const addDialCode = ({
  phone,
  dial_code,
  prefix = '+',
  charAfterDialCode = ' ',
}: AddDialCodeProps) => {
  // prevent double dial code
  return `${prefix}${dial_code}${charAfterDialCode}${removeDialCode({
    phone,
    dial_code,
    charAfterDialCode,
    prefix,
  })}`
}
