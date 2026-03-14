export interface SpentraxConfig {
    apiKey: string;
  }
  
  export interface TrackPayload {
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
  }