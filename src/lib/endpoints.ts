import { RequestHandler } from "itty-router";

import { SlackRequest } from "../middleware/with-slack";

import { isString } from "./predicates";
import { handleCreateCommand } from "./slash";
import { HostRequest } from "../middleware/with-host";

export const handleEventsEndpoint: RequestHandler<SlackRequest> = async (
  request
) => {
  const payload = await request.json<EventCallbackPayload>();

  switch (payload.event.type) {
    case "message":
      return {};
    default:
      return {};
  }
};

// Slash Command Endpoint
export const handleSlashEndpoint: RequestHandler<SlackRequest> = async (
  request
) => {
  const payload = await request.clone().formData();
  const command = payload.get("command");
  const id = payload.get("trigger_id");

  const hasValidPayload = isString(command) && isString(id);
  if (!hasValidPayload) throw "Payload was invalid";

  switch (command) {
    case "create":
    default:
      return await handleCreateCommand(id, request);
  }
};

// Interactivity Endpoint
export const handleInteractivityEndpoint: RequestHandler<HostRequest> = async (
  request
) => {
  try {
    const form = await request.clone().formData();

    const _payload = form.get("payload");
    if (!isString(_payload)) {
      throw "Payload was not provided in correct format.";
    }

    const payload = JSON.parse(_payload);

    const values = Object.values<{
      [key: string]: {
        type: string;
        value: string;
      };
    }>(payload.view.state.values).reduce(
      (acc, view) => {
        const [key] = Array.from(Object.keys(view));
        return {
          ...acc,
          [key]: view[key].value,
        };
      },
      {} as Record<string, string>
    );

    const topic = values.trivia__topic;
    const count = parseInt(values.trivia__count);

    const questions = await request.host.writeQuestions(topic, count);
    return payload;
  } catch (error) {
    console.error(error);
  }
};
