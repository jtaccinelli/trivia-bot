import { View } from "@slack/types";

export const VIEW__CREATE_TRIVIA: View = {
  type: "modal",
  title: {
    type: "plain_text",
    text: "Start New Trivia",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Generate",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Hello*!\nFill out the below to generate some trivia questions.",
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      label: {
        type: "plain_text",
        text: "What topic should the questions be related to?",
        emoji: true,
      },
      element: {
        type: "plain_text_input",
        action_id: "trivia__topic",
      },
    },
    {
      type: "input",
      label: {
        type: "plain_text",
        text: "How many questions would you like to generate?",
        emoji: true,
      },
      element: {
        type: "number_input",
        is_decimal_allowed: false,
        action_id: "trivia__count",
      },
    },
  ],
};
