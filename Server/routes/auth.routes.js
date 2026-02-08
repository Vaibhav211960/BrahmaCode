import express from "express";
const router = express.Router();

router.post("/logout", async (req, res) => {
  try {
    const { role } = req.body;

    if (role === "athlete") {
      const token =
        req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      redisClient.set(token, "logout", "EX", 60 * 60 * 24);

      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      const token =
        req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      redisClient.set(token, "logout", "EX", 60 * 60 * 24);

      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
