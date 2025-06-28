import { SlackRequest } from "../middleware/with-slack";
import { VIEW__CREATE_TRIVIA } from "./views";

export async function handleCreateCommand(id: string, request: SlackRequest) {
  await request.slack.views.open({
    trigger_id: id,
    view: VIEW__CREATE_TRIVIA,
  });

  return new Response();
}
