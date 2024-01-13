// `@expo/metro-runtime` MUST be the first import to ensure Fast Refresh works
// on web.
// This file should only import and register the root. No components or exports
// should be added here.
import './importPolyfills'
import '@expo/metro-runtime'
import { renderRootComponent } from 'expo-router/src/renderRootComponent'
import 'react-native-url-polyfill/auto'
import * as Sentry from 'sentry-expo'

import ZixApp from './src/ZixApp'

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  enableInExpoDevelopment: process.env.SENTRY_ENABLE_EXPO_DEVELOPMENT || false,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: process.env.SENTRY_TRACE_SAMPLE_RATE || 1.0,
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
renderRootComponent(ZixApp)
