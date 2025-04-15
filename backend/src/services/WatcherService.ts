import { runWatcher1 } from "../watchers/watcher1";
import { runWatcher2 } from "../watchers/watcher2";
import { runWatcher3 } from "../watchers/watcher3";

export async function validateTransaction(data: any) {
  const results = [
    { watcher: "watcher1", ...runWatcher1(data) },
    { watcher: "watcher2", ...runWatcher2(data) },
    { watcher: "watcher3", ...runWatcher3(data) },
  ];

  const allApproved = results.every((r) => r.approved);

  return {
    allApproved,
    results,
  };
}
