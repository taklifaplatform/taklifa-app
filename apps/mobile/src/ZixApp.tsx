import { OpenAPI } from '@zix/api';
import { bootMultiLang, MultiLangAppProvider } from '@zix/i18n'
import { ExpoRoot } from 'expo-router';
import React from 'react';
import * as Sentry from "@sentry/react-native";

// import { LogBox } from 'react-native'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context('./main');

const defaultLang = bootMultiLang()
OpenAPI.BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

function ZixApp() {
  return (
    <MultiLangAppProvider defaultLang={defaultLang}>
      <ExpoRoot context={context} />
    </MultiLangAppProvider>
  )
}


export default Sentry.wrap(ZixApp);
