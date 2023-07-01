const cookiesMiddleware = (req, res, next) => {
    res.setHeader("Set-Cookie", [
      "_ga=; SameSite=None; Secure",
      "_ga_3WTQFP9ECQ=; SameSite=None; Secure",
      "SID=; SameSite=None; Secure",
      "__Secure-1PSID=; SameSite=None; Secure",
      "HSID=; SameSite=None; Secure",
      "SSID=; SameSite=None; Secure",
      "APISID=; SameSite=None; Secure",
      "SAPISID=; SameSite=None; Secure",
      "__Secure-1PAPISID=; SameSite=None; Secure",
      "PLAY_ACTIVE_ACCOUNT=; SameSite=None; Secure",
      "OSID=; SameSite=None; Secure",
      "1P_JAR=; SameSite=None; Secure",
      "__Secure-1PSIDTS=; SameSite=None; Secure",
      "SIDCC=; SameSite=None; Secure",
      "__Secure-1PSIDCC=; SameSite=None; Secure",
    ]);
  
    next();
  };
  
  export default cookiesMiddleware;
  