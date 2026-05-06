import axios from "axios";
import * as cheerio from "cheerio";

import Story from "../models/Story.js";

const scrapeHackerNews = async () => {
  try {
    console.log("Starting Hacker News scraping...");

    // Fetch HTML
    const { data } = await axios.get(
      "https://news.ycombinator.com"
    );

    const $ = cheerio.load(data);

    const stories = [];

    // Get top 10 rows
    $(".athing")
      .slice(0, 10)
      .each((index, element) => {
        const title = $(element)
          .find(".titleline a")
          .text();

        const url = $(element)
          .find(".titleline a")
          .attr("href");

        const subtext = $(element).next();

        const pointsText = subtext
          .find(".score")
          .text();

        const points = parseInt(pointsText) || 0;

        const author = subtext
          .find(".hnuser")
          .text();

        const postedAt = subtext
          .find(".age")
          .text();

        stories.push({
          title,
          url,
          points,
          author,
          postedAt,
        });
      });

    // Clear old stories
    await Story.deleteMany();

    // Insert new stories
    await Story.insertMany(stories);

    console.log("Stories scraped successfully");

    return stories;
  } catch (error) {
    console.error("Scraping failed:", error.message);

    throw error;
  }
};

export default scrapeHackerNews;