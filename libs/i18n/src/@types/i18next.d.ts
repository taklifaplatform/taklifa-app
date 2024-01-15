import 'i18next'
import Resources from './resources'
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'common'
    // custom resources type
    resources: Resources
    // other
  }
}
