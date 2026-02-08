import Practice from "../models/practice.model.js";

export const createPractice = async (req, res) => {
  try {
    const { title, athleteId, coachId, activityName, duration, note } =
      req.body;

    if (!title || !athleteId || !coachId || !activityName) {
      return res.status(400).json({
        success: false,
        message: "Title, athleteId, coachId, and activityName are required",
      });
    }

    const practice = await Practice.create({
      title,
      athleteId,
      coachId,
      activityName,
      duration,
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
    const { athleteId, coachId } = req.query;

    if (!athleteId && !coachId) {
      return res.status(400).json({
        success: false,
        message: "athleteId or coachId is required",
      });
    }

    const filter = [];

    if (athleteId) filter.push({ athleteId });
    if (coachId) filter.push({ coachId });

    const practices = await Practice.find({
      $or: filter,
    })
      .populate("coachId", "name email")
      .populate("athleteId", "name email")
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
