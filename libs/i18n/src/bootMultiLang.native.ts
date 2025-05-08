import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';

export function bootMultiLang() {

  const supportedLangs = ['en', 'ar'];
  const deviceLang = getLocales()?.[0]?.languageCode || getLocales()?.[0]?.languageTag;
  // alert(defaultLang);

  const defaultLang = !deviceLang || supportedLangs.includes(deviceLang) ? 'ar' : deviceLang;

  const isRtl = defaultLang === 'ar';
  I18nManager.allowRTL(isRtl);
  I18nManager.forceRTL(isRtl);
  return defaultLang;
}

export default bootMultiLang;
