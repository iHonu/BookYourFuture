import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.KEY_JWT_AUTH);

      req.userId = decoded._id; // get userId
      next();
    } catch (err) {
      return res.status(400).json({
        message: "Not access",
      });
    }
  } else {
    return res.status(403).json({
      message: "Not token",
    });
  }
};
