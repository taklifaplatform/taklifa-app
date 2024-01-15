import { bootMultiLang, MultiLangAppProvider } from '@zix/i18n'
import { ExpoRoot } from 'expo-router';
import React from 'react';
// import { LogBox } from 'react-native'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context('./app');

const defaultLang = bootMultiLang()

export default function ZixApp() {
  return (
    <MultiLangAppProvider defaultLang={defaultLang}>
      <ExpoRoot context={context} />
    </MultiLangAppProvider>
  )
}
