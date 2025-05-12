import { Mixpanel } from 'mixpanel-react-native'

const trackAutomaticEvents = false
export const mixpanel = new Mixpanel(
  '472b2ed2f46b45ec5d15bd19d95f2965',
  trackAutomaticEvents,
)
