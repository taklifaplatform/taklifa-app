interface ApplyMaskArgs {
  value: string
  mask: string
  maskSymbol: string

  /**
   * Apply mask starting from provided char index
   * @example
   * value: "+12345678"
   * mask: "(....)"
   * offset === 2 -> "+1(2345)"
   * offset === 5 -> "+1234(5678)"
   */
  offset?: number

  /**
   * @description Removes all non-maskSymbol chars from the result's ending if the value is shorter than the mask
   * @example
   * value: "1234"
   * mask: "(....) ...."
   * if true -> "(1234"
   * if false -> "(1234) "
   */
  trimNonMaskCharsLeftover?: boolean
}

export const applyMask = ({
  value,
  mask,
  maskSymbol,
  offset = 0,
  trimNonMaskCharsLeftover = false,
}: ApplyMaskArgs): string => {
  if (value.length < offset) return value

  const savedValuePart = value.slice(0, offset)
  const valueToMask = value.slice(offset)

  let result = savedValuePart

  let charsPlaced = 0

  if (!mask) {
    return value
  }
  for (const mask_char of mask.split('')) {
    if (charsPlaced >= valueToMask.length) {
      if (!trimNonMaskCharsLeftover && mask_char !== maskSymbol) {
        result += mask_char
        continue
      }
      break
    }
    if (mask_char === maskSymbol) {
      result += valueToMask[charsPlaced]
      charsPlaced += 1
    } else {
      result += mask_char
    }
  }

  return result
}
