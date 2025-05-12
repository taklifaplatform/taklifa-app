import Mixpanel from "mixpanel-browser";

const trackAutomaticEvents = false
Mixpanel.init("472b2ed2f46b45ec5d15bd19d95f2965", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});
export const mixpanel = Mixpanel;
