import config from "config";

export default function () {
  const nodeEnv = config.util.getEnv("NODE_ENV");
  const jwt = config.get("jwtPrivateKey");

  console.log("Current environment:", nodeEnv);
    console.log("Current jwtPrivateKey:", jwt);
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
