import { SlackEvent } from "@slack/types";

declare global {
  type CloudflareArgs = [Env, ExecutionContext];

  type UrlVerificationPayload = {
    type: "url_verification";
    challenge: string;
  };

  type EventCallbackPayload = {
    type: "event_callback";
    event_time: number;
    event_id: string;
    event: SlackEvent;
  };
}
