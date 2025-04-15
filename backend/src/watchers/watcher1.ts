import { WatcherResponse } from "./types";

export function runWatcher1(data: any): WatcherResponse {
  const isValid = data.salePrice > 1000;
  return {
    approved: isValid,
    signature: "watcher1-fake-signature",
    notes: isValid ? "Price is acceptable" : "Sale price too low",
  };
}
