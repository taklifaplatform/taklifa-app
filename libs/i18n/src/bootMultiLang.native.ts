import { getLocales } from 'expo-localization'
import { I18nManager, Platform } from 'react-native'

export function bootMultiLang() {
  // TODO: enable this line
  // const defaultLang = 'en';
  const defaultLang = 'ar'
  // const defaultLang = getLocales()?.[0]?.languageCode || 'en'

  if (Platform.OS === 'ios') {
    const isRtl = defaultLang === 'ar'
    I18nManager.allowRTL(isRtl)
    I18nManager.forceRTL(isRtl)
  }
  return defaultLang
}

export default bootMultiLang
