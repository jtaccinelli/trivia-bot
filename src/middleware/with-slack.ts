import { IRequest, RequestHandler } from "itty-router";
import { WebClient } from "@slack/web-api";

export interface SlackRequest extends IRequest {
  slack: WebClient;
}

export const withSlack: RequestHandler<SlackRequest, CloudflareArgs> = (
  request,
  env
) => {
  const slack = new WebClient(env.SLACK_BOT_TOKEN);
  request.slack = slack;
};
