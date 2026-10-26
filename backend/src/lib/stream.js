import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // will be used chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // will be used for video calls

export const upsertStreamUser = async (userData) => {
  await chatClient.upsertUser(userData);
};

export const deleteStreamUser = async (userId) => {
  await chatClient.deleteUser(userId);
};