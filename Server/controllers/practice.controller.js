import Practice from "../models/practice.model"

import Practice from "../models/practice.model.js";

export const createPractice = async (req, res) => {
  try {
    const { title, athleteId, coachId, activities } = req.body;
    
    if (!title || !athleteId || !coachId) {
      return res.status(400).json({
        success: false,
        message: "Title, athleteId, and coachId are required",
      });
    }

    let formattedActivities = [];
    if (Array.isArray(activities)) {
      formattedActivities = activities.map((activity) => ({
        activityName: activity.activityName,
        score: null, // score will be added later
      }));
    }

    const practice = await Practice.create({
      title,
      athleteId,
      coachId,
      activities: formattedActivities,
    });

    res.status(201).json({
      success: true,
      message: "Practice created successfully",
      data: practice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create practice",
      error: error.message,
    });
  }
};
