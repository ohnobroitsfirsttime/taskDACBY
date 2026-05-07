import Story from "../models/Story.js";
import User from "../models/User.js";

// GET ALL STORIES
export const getStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalStories = await Story.countDocuments();

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalStories / limit),
      totalStories,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE STORY
export const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// TOGGLE BOOKMARK
export const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;

    const user = await User.findById(req.user._id);

    const alreadyBookmarked = user.bookmarks.includes(
      storyId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (bookmark) => bookmark.toString() !== storyId
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Bookmark removed",
        bookmarks: user.bookmarks,
      });
    }

    user.bookmarks.push(storyId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Story bookmarked",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};