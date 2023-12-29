import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Unauthorised Access" });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    
    jwt.verify(token, process.env.jwtPrivateKey, (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

export default verifyToken;
