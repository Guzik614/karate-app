import "server-only";
import Mux from "@mux/mux-node";

let client: Mux | null = null;

export function getMux() {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    throw new Error("Brak MUX_TOKEN_ID / MUX_TOKEN_SECRET");
  }
  client ??= new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
    webhookSecret: process.env.MUX_WEBHOOK_SECRET,
  });
  return client;
}
