import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';

export function bootMultiLang() {
  const deviceLang = getLocales()?.[0]?.languageCode || getLocales()?.[0]?.languageTag;
  // alert(defaultLang);
  const isArabic = !deviceLang || deviceLang.includes('ar');

  const defaultLang = isArabic ? 'ar' : 'en';

  const isRtl = defaultLang === 'ar';
  I18nManager.allowRTL(isRtl);
  I18nManager.forceRTL(isRtl);
  return defaultLang;
}

export default bootMultiLang;
