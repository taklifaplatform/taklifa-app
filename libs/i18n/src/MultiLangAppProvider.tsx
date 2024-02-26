import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { I18nManager, Platform } from 'react-native';

import { MultiLangContext } from './MultiLangContext';
import i18n from './i18n';

async function getActiveLanguage(defaultLang: string) {
  const localLanguage = await AsyncStorage.getItem('LANGUAGE');
  if (!localLanguage) {
    await AsyncStorage.setItem('LANGUAGE', defaultLang);
  }

  const language = localLanguage || defaultLang;

  const isRtl = language === 'ar';
  I18nManager.allowRTL(isRtl);
  I18nManager.forceRTL(isRtl);
  document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
  return language;
}

export interface ILangProviderProps {
  children: React.ReactNode;
  defaultLang: string;
}

export function MultiLangAppProvider({ children, defaultLang }: ILangProviderProps) {
  const [activeLanguage, setActiveLanguage] = useState<string>();
  useEffect(() => {
    (async () => {
      let lang = defaultLang;
      if (Platform.OS !== 'ios') {
        lang = await getActiveLanguage(defaultLang);
      }

      i18n.changeLanguage(lang);

      setActiveLanguage(lang);
    })();
  }, [defaultLang]);

  if (!activeLanguage) {
    return null;
  }

  return <MultiLangContext.Provider value={activeLanguage}>{children}</MultiLangContext.Provider>;
}
