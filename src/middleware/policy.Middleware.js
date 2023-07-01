const policyMiddleware = (req, res, next) => {
  // Replace 'broken-image.jpg' with the actual resource URL
  if (req.url === "/broken-image.jpg") {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }

  next();
};

export default policyMiddleware;
