import { RequestHandler } from "itty-router";

export const withUrlVerification: RequestHandler = async (_request) => {
  const request = _request.clone();
  const body = await request.json<UrlVerificationPayload>();

  if (body.type && body.type === "url_verification") {
    return {
      challenge: body.challenge,
    };
  }
};
