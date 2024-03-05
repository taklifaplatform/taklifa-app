import AsyncStorage from '@react-native-async-storage/async-storage'

import { useContext } from 'react'
import { Platform } from 'react-native'
import { MultiLangContext } from './MultiLangContext'
import i18n from './i18n'

export function useMultiLang() {
  const activeLang = useContext(MultiLangContext)
  const isRtl = activeLang === 'ar'

  function updateDefaultLanguage() {
    i18n.changeLanguage(activeLang)
  }

  async function changeLanguage(lang: string) {
    await AsyncStorage.setItem('LANGUAGE', lang)
    if (Platform.OS === 'web') {
      window.location.reload()
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
