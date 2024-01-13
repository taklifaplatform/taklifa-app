import { ExpoRoot } from 'expo-router';
import React from 'react';
// import { LogBox } from 'react-native'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context('./app');

export default function ZixApp() {
  return <ExpoRoot context={context} />;
}
