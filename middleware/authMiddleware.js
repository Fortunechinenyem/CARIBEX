import jwt from "jsonwebtoken";

export const verifyToken = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
