import { createClient } from "./http";
import { SpentraxConfig, TrackPayload } from "./types";

const BASE_URL = "https://spentrax-backend.onrender.com/api/v1";

export class Spentrax {
  private readonly client;
  private queue: TrackPayload[] = [];

  constructor(config: SpentraxConfig) {
    this.client = createClient(config.apiKey, BASE_URL);

    // flush every 5 seconds
    setInterval(() => {
      this.flush();
    }, 5000);

    // flush before process exit
    process.on("beforeExit", () => {
      this.flush();
    });
  }

  track(data: TrackPayload): void {
    if (!data.provider) {
      throw new Error("Spentrax: provider is required");
    }

    if (!data.model) {
      throw new Error("Spentrax: model is required");
    }

    if (typeof data.inputTokens !== "number") {
      throw new TypeError("Spentrax: inputTokens must be a number");
    }

    if (typeof data.outputTokens !== "number") {
      throw new TypeError("Spentrax: outputTokens must be a number");
    }

    this.queue.push(data);

    // flush immediately if queue too large
    if (this.queue.length >= 20) {
      this.flush();
    }
  }

  private flush() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    this.client
      .post("/usage/batch", {
        events: batch,
      })
      .catch(() => {
        // ignore errors so user app never breaks
      });
  }
}