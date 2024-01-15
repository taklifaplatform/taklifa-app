import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Updates from 'expo-updates'

import { useContext } from 'react'
import { DevSettings, I18nManager, Platform } from 'react-native'
import i18n from './i18n'
import { MultiLangContext } from './MultiLangContext'

export function useMultiLang() {
  const activeLang = useContext(MultiLangContext)

  const isRtl = activeLang === 'ar'

  function updateDefaultLanguage() {
    i18n.changeLanguage(activeLang)
  }

  async function changeLanguage(lang: string) {
    await AsyncStorage.setItem('LANGUAGE', lang)
    const isNextRtl = lang === 'ar'
    I18nManager.allowRTL(isNextRtl)
    I18nManager.forceRTL(isNextRtl)
    if (Platform.OS !== 'web') {
      if (Constants.appOwnership === 'expo') {
        DevSettings.reload()
      } else {
        Updates.reloadAsync()
      }
    }
  }

  return {
    updateDefaultLanguage,
    activeLang,
    isRtl,
    changeLanguage,
  }
}

export default useMultiLang
