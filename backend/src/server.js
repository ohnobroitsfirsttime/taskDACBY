import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import scrapeHackerNews from "./scraper/scrapeHackerNews.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
await scrapeHackerNews();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});