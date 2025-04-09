"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not authenticated");
  if (!apiKey) throw new Error("Stream API key is missing");
  if (!secret) throw new Error("Stream API secret is missing");
  const client = new StreamClient(apiKey, secret);

  const userId: string = user.id;
  const validity = 60 * 60;
  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: validity,
  });

  return token as string
};
