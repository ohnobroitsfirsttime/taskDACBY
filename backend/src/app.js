import express from "express";
import cors from "cors";
import scrapeRoutes from "./routes/scrapeRoutes.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API running successfully",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scrape", scrapeRoutes);

export default app;