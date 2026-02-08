import Practice from "../models/practice.model.js";

export const createPractice = async (req, res) => {
  try {
    const { title, athleteId, coachId, activities, note } = req.body;

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
        score: null,
      }));
    }

    const practice = await Practice.create({
      title,
      athleteId,
      coachId,
      activities: formattedActivities,
      note,
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

export const getPractices = async (req, res) => {
  try {
    const { athleteId } = req.params;

    if (!athleteId) {
      return res.status(400).json({
        success: false,
        message: "athleteId is required",
      });
    }

    const practices = await Practice.find({ athleteId })
      .populate("coachId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Practices fetched successfully",
      count: practices.length,
      data: practices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch practices",
      error: error.message,
    });
  }
};
