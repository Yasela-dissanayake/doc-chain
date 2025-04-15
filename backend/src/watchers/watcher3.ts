import { WatcherResponse } from "./types";

export function runWatcher3(data: any): WatcherResponse {
  const isValid = data.landId !== undefined;
  return {
    approved: isValid,
    signature: "watcher3-fake-signature",
    notes: isValid ? "Land ID exists" : "Invalid land ID",
  };
}
