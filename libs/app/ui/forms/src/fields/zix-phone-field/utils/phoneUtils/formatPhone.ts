import { applyMask, removeNonDigits } from "../common";

export interface FormatPhoneConfig {
  prefix: string;
  dial_code: string;
  mask: string;
  mask_char: string;
  /**
   * Passed value will set after dial code
   */
  charAfterDialCode?: string;
  /**
   * Force dial code setting to result value
   * Will return only dial code if passed value not starts with dial code
   */
  forceDialCode?: boolean;
  /**
   * Insert prefix and dial code if provided empty value
   */
  insertDialCodeOnEmpty?: boolean;
  /**
   * @description
   * Result will not include passed *dial_code* and *prefix* if set to *true*.
   * Passed value will not process dial code if it's included in provided value.
   * Result will be the same as with *forceDialCode* option but without prefix and dial code on start
   *
   * @ignore provided *forceDialCode* value will be ignored and set to *false*
   * @ignore provided *insertDialCodeOnEmpty* value will be ignored and set to *true*
   */
  disableDialCodeAndPrefix?: boolean;
  /**
   * Trim all non-digit values from the end of the result
   */
  trimNonDigitsEnd?: boolean;
}

export const formatPhone = (
  phone: string,
  config: FormatPhoneConfig,
): string => {
  const shouldForceDialCode = config.disableDialCodeAndPrefix
    ? false
    : config.forceDialCode;

  const shouldInsertDialCodeOnEmpty = config.disableDialCodeAndPrefix
    ? false
    : config.insertDialCodeOnEmpty;

  let phoneValue = phone;

  const handleResult = (result: string) => {
    if (config.trimNonDigitsEnd) {
      return result.trim();
    }
    return result;
  };

  // Passed empty value
  if (!phoneValue) {
    if (
      (shouldInsertDialCodeOnEmpty && !phoneValue.length) || shouldForceDialCode
    ) {
      return handleResult(
        `${config.prefix}${config.dial_code}${config.charAfterDialCode}`,
      );
    }

    return handleResult(phoneValue);
  }

  // Remove non digit chars from provided value
  phoneValue = removeNonDigits(phoneValue);

  // Passed only full dial code
  if (phoneValue === config.dial_code && !config.disableDialCodeAndPrefix) {
    return handleResult(
      `${config.prefix}${config.dial_code}${config.charAfterDialCode}`,
    );
  }

  // Passed only partial dial code
  if (
    config.dial_code.startsWith(phoneValue) && !config.disableDialCodeAndPrefix
  ) {
    if (shouldForceDialCode) {
      return handleResult(
        `${config.prefix}${config.dial_code}${config.charAfterDialCode}`,
      );
    }
    return handleResult(`${config.prefix}${phoneValue}`);
  }

  // Passed phone that not started with dial code
  if (
    !phoneValue.startsWith(config.dial_code) && !config.disableDialCodeAndPrefix
  ) {
    if (shouldForceDialCode) {
      return handleResult(
        `${config.prefix}${config.dial_code}${config.charAfterDialCode}`,
      );
    }

    if (phoneValue.length < config.dial_code.length) {
      return handleResult(`${config.prefix}${phoneValue}`);
    }
  }

  const slicePhone = () => {
    const mainPartStartIndex = config.dial_code.length;

    const phoneLeftSide = phoneValue.slice(0, mainPartStartIndex);
    const phoneRightSide = phoneValue.slice(mainPartStartIndex);

    return {
      phoneLeftSide,
      phoneRightSide,
    };
  };

  // slice phone to dial_code and rest value
  // "+12345" (us) -> leftSide: "+1"; rightSide: "2345"
  // leftSide: prefix + dial_code + charAfterDialCode
  // rightSide: rest of phone (that should apply mask)
  let { phoneLeftSide, phoneRightSide } = slicePhone();

  // Handle left side of phone
  phoneLeftSide = `${config.prefix}${phoneLeftSide}${config.charAfterDialCode}`;

  // Handle right side of phone
  phoneRightSide = applyMask({
    value: phoneRightSide,
    mask: config.mask,
    maskSymbol: config.mask_char,
    trimNonMaskCharsLeftover: config.trimNonDigitsEnd ||
      (config.disableDialCodeAndPrefix && phoneRightSide.length === 0),
  });

  if (config.disableDialCodeAndPrefix) {
    phoneLeftSide = "";
  }

  return handleResult(`${phoneLeftSide}${phoneRightSide}`);
};
