import config from "config";

export default function () {
  const nodeEnv = config.util.getEnv("NODE_ENV");

  console.log("Current environment:", nodeEnv);
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
