const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in isAuthenticated", error);
    res.status(401).json({ message: "Unauthorized, something went wrong" });
  }
};

module.exports = isAuthenticated;
