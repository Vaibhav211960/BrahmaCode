import { validationResult } from "express-validator";
import coachModel from "../models/coach.model.js";
import { sendInvitation } from "../services/invitaionService.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, academy, level, category } = req.body;
    const existingUser = await coachModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await coachModel.hashPassword(password);
    const newCoach = new coachModel({
      name,
      email,
      password: hashedPassword,
      level,
      category,
      ...(academy && { academy }),
    });

    await newCoach.save();

    const token = newCoach.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(201).json({
      user: newCoach,
      token,
      message: "Coach registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginCoach = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const coach = await coachModel.findOne({ email });
    if (!coach) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await coach.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = coach.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: coach._id,
        name: coach.name,
        email: coach.email,
        academy: coach.academy,
      },
      type: "Coach",
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const Coach = await coachModel.findOne({ email });
    if (!Coach) {
      return res.status(400).json({ message: "Coach not found" });
    }

    const hashedPassword = await coachModel.hashPassword(newPassword);
    Coach.password = hashedPassword;
    await Coach.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendInvitationToAthlete = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email } = req.body;
    const loggedInUser = await coachModel.findOne({ email: req.user.email });
    const invitedBy = loggedInUser._id.toString();

    const invitation = await sendInvitation(email, invitedBy);
    return res.status(201).json(invitation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const removeDisciple = async (req, res) => {
  try {
    const { coachId, athleteId } = req.body;

    if (!coachId || !athleteId) {
      return res.status(400).json({
        message: "coachId and athleteId are required",
      });
    }

    const updatedCoach = await coachModel.findByIdAndUpdate(
      coachId,
      {
        $pull: { disciples: athleteId },
      },
      { new: true },
    ).populate("disciples");

    if (!updatedCoach) {
      return res.status(404).json({
        message: "Coach not found",
      });
    }

    res.status(200).json({
      message: "Disciple removed successfully",
      data: updatedCoach,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const coach = await coachModel
      .findOne({ email: req.user.email })
      .select("-password")
      .populate("disciples", "-password");

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, category, level, yearOfExp, education, coachInstitute, bio } = req.body;
    
    const coach = await coachModel.findOne({ email: req.user.email });
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Update profile fields
    if (name) coach.name = name;
    if (email && email !== coach.email) {
      const existingUser = await coachModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      coach.email = email;
    }
    if (category) coach.category = category;
    if (level) coach.level = level;
    if (yearOfExp) coach.yearOfExp = yearOfExp;
    if (education) coach.education = education;
    if (coachInstitute) coach.coachInstitute = coachInstitute;
    if (bio) coach.bio = bio;

    await coach.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};