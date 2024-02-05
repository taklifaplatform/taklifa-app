import { I18nManager } from 'react-native'

export function bootMultiLang() {
  // // TODO: enable this line
  // // const defaultLang = 'en';
  const defaultLang = "ar";

  const isRtl = defaultLang === 'ar'
  I18nManager.allowRTL(isRtl)
  I18nManager.forceRTL(isRtl)

  return defaultLang;
}

export default bootMultiLang;
