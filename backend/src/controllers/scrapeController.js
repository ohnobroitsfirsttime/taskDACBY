import scrapeHackerNews from "../scraper/scrapeHackerNews.js";

export const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();

    res.status(200).json({
      success: true,
      message: "Stories scraped successfully",
      total: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};