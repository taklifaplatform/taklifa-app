import { OpenAPI } from '@zix/api';
import { bootMultiLang, MultiLangAppProvider } from '@zix/i18n'
import { ExpoRoot } from 'expo-router';
import React from 'react';

/**
 * Need to load them here to avoid the following error:
 * package not found when sync with expo
 */
import "react-native-modal-datetime-picker";


// import { LogBox } from 'react-native'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context('./app');

const defaultLang = bootMultiLang()
OpenAPI.BASE = `${process.env.LARAVEL_API_URL}`;

export default function ZixApp() {
  return (
    <MultiLangAppProvider defaultLang={defaultLang}>
      <ExpoRoot context={context} />
    </MultiLangAppProvider>
  )
}
