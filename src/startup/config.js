import config from "config";

export default function () {
  const nodeEnv = config.get("node_env");
  const jwt = config.get("jwtPrivateKey");
  const port = config.get("port");

  console.log("Current environment:", nodeEnv);
  console.log("Current jwtPrivateKey:", jwt);
  console.log("Current port:", port);

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
