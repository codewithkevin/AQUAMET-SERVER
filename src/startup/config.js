import config from "config";

export default function () {
  const jwt = config.get("jwtPrivateKey");
  const port = config.get("port");
  const admin = config.get("admin_role3");
  const pass = config.get("pass");
  const email = config.get("company_email");

  console.log("Current jwtPrivateKey:", jwt);
  console.log("Current port:", port);
  console.log("Current admin:", admin);
  console.log("Current pass:", pass);
  console.log("Current email:", email);
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
}
