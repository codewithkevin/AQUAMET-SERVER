import config from "config";

export default function () {
  const nodeEnv = config.get("node_env");
  const jwt = config.get("jwtPrivateKey");
  const port = config.get("port");
  const admin = config.get("admin_user1");

  console.log("Current environment:", nodeEnv);
  console.log("Current jwtPrivateKey:", jwt);
  console.log("Current port:", port);
  console.log("Current admin:", admin);

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
