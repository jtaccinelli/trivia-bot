import { router } from "./lib/router";

import { withUrlVerification } from "./middleware/with-url-verification";
import { withSlack } from "./middleware/with-slack";

import {
  handleEventsEndpoint,
  handleInteractivityEndpoint,
  handleSlashEndpoint,
} from "./lib/endpoints";
import { withHost } from "./middleware/with-host";

router.all("*", withSlack);

// Events Endpoint
router.all("/events", withUrlVerification);
router.post("/events", handleEventsEndpoint);

// Slash Endpoint
router.post("/slash", handleSlashEndpoint);

// Interactivity Endpoint
router.all("/interactive", withHost);
router.post("/interactive", handleInteractivityEndpoint);

export default router;
