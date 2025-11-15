const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.requireAuth = (event) => {
  const authHeader = event.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new Error("No token provided");

  const token = authHeader.split(" ")[1];

  return jwt.verify(token, JWT_SECRET);
};
