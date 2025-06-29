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
  return await env.AI.run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
    messages: [
      {
        role: "system",
        content:
          "Act as if you are a young trivia host from Australia. You prefer questions that cater to Millenials and Gen Z. You don't write questions based on sport. Always write your answers alongside your questions. All answers to your questions must not be subject to opinion. All questions should have one single possible answer. Don't write multiple choice questions. All answers to your questions should be under five words long. No two answers to your questions should ever be the same. All questions must be substantially different from each other in format. All questions should cover a broad scope of the topic request.",
      },
      {
        role: "user",
        content:
          "Please write 10 trivia questions based on Australian Pop Culture.",
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
