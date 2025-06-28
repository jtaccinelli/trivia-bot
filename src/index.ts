import { router } from "./lib/router";

import { withUrlVerification } from "./middleware/with-url-verification";
import { withSlack } from "./middleware/with-slack";

import {
  handleAiEndpoint,
  handleEventsEndpoint,
  handleInteractivityEndpoint,
  handleSlashEndpoint,
} from "./lib/endpoints";

router.all("*", withSlack);

// Events Endpoint
router.all("/events", withUrlVerification);
router.post("/events", handleEventsEndpoint);

// Slash Endpoint
router.post("/slash", handleSlashEndpoint);

// Interactivity Endpoint
router.post("/interactive", handleInteractivityEndpoint);

router.get("/ai", handleAiEndpoint);

export default router;
