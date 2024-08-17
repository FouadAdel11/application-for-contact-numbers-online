const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validateToken = asyncHandler(async (req, res, next) => {
  try {
let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
  }
  } catch (error) {
    res.status(500)
    next(error)
  }

});

module.exports = validateToken;
