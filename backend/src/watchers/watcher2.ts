import { WatcherResponse } from "./types";

export function runWatcher2(data: any): WatcherResponse {
  const isValid = !!data.buyer && !!data.seller;
  return {
    approved: isValid,
    signature: "watcher2-fake-signature",
    notes: isValid ? "Parties are valid" : "Missing buyer or seller info",
  };
}
