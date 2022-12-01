import Raven from "raven-js";
import configs from "./utils/configs";
import TagManager from 'react-gtm-module'


const ga = window.ga;

export default function registerTelemetry(trackedPage, trackedTitle) {
  const sentryDsn = configs.SENTRY_DSN;
  const gaTrackingId = configs.GA_TRACKING_ID;

  if (sentryDsn) {
    console.log("Tracking: Sentry DSN: " + sentryDsn);
    Raven.config(sentryDsn).install();
  }

  const tagManagerArgs = {
    gtmId: 'G-VB9W84LPKN'
  }

  TagManager.initialize(tagManagerArgs)

  if (ga && gaTrackingId) {
    console.log("Tracking: Google Analytics ID: " + gaTrackingId);

    ga("create", gaTrackingId, "auto");

    if (trackedPage) {
      ga("set", "page", trackedPage);
    }

    if (trackedTitle) {
      ga("set", "title", trackedTitle);
    }

    ga("send", "pageview");
  }
}
