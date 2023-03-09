import express from "express";
import authRouter from "./auth.route";

const router = express.Router();

router.use("/api", authRouter);
router.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

export default router;
