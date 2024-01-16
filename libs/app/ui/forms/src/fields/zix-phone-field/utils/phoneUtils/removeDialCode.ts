interface RemoveDialCodeProps {
  phone: string
  dial_code: string
  prefix?: string
  charAfterDialCode?: string
}

export const removeDialCode = ({
  phone,
  dial_code,
  prefix = '+',
  charAfterDialCode = ' ',
}: RemoveDialCodeProps) => {
  if (!phone || !dial_code) {
    return phone
  }

  let result = phone

  if (result.startsWith(prefix)) {
    result = result.replace(prefix, '')
  }

  if (!result.startsWith(dial_code)) {
    // passed value with wrong dial code
    return phone
  }

  result = result.replace(dial_code, '')

  if (result.startsWith(charAfterDialCode)) {
    result = result.replace(charAfterDialCode, '')
  }

  return result
}
