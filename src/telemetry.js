import Raven from "raven-js";
import configs from "./utils/configs";
import { gtag, install } from 'ga-gtag';


export default function registerTelemetry(trackedPage, trackedTitle) {
  const sentryDsn = configs.SENTRY_DSN;
  const gaTrackingId = configs.GA_TRACKING_ID;

  if (sentryDsn) {
    console.log("Tracking: Sentry DSN: " + sentryDsn);
    Raven.config(sentryDsn).install();
  }

  if (gaTrackingId) {
    console.log("Tracking: Google Analytics ID: " + gaTrackingId);
    install(gaTrackingId,  { 'send_page_view': false });
    gtag('event', 'pageview', {
      page:{
        title: trackedTitle,
        page: trackedPage
      }
    });

  }
}
