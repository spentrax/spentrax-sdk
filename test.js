const { Spentrax } = require("./dist");

const spentrax = new Spentrax({
  apiKey: "spx_sk_85731955fd7981a19290c4a261a934e7d82b1cc340bcef6c"
});

spentrax.track({
  provider: "openai",
  model: "gpt-4",
  inputTokens: 500,
  outputTokens: 200
});

spentrax.track({
  provider: "openai",
  model: "gpt-3.5",
  inputTokens: 300,
  outputTokens: 100
});

console.log("Tracking events...");