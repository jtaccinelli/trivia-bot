import { RequestHandler } from "itty-router";

import { SlackRequest } from "../middleware/with-slack";

import { isString } from "./predicates";
import { handleCreateCommand } from "./slash";

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
export const handleInteractivityEndpoint: RequestHandler<SlackRequest> = async (
  request
) => {
  const payload = await request.clone().formData();
  const values = payload.get("view.state.values");

  console.log("payload", values);

  return payload;
};

export const handleAiEndpoint: RequestHandler<
  SlackRequest,
  CloudflareArgs
> = async (request, env) => {
  return await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
    messages: [
      {
        role: "system",
        content:
          "You are an Australian trivia host. You prefer questions that are more relevant to people who are millenials, or younger. You don't like questions based on sport. The questions you write are always written alongside their answers. The answers to your questions must all be objective and not be based on opinion. Every question should only have one possible answer to them that cannot be argued against. You never write multiple choice questions. The answers to your questions should always be one to five words long. No two answers to your questions should ever be the same.",
      },
      {
        role: "user",
        content:
          "Please write 10 trivia questions based on Javascript development.",
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                },
                answer: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  });
};
