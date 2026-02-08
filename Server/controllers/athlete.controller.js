import { validationResult } from "express-validator";

import Athlete from "../models/athlete.model.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, sport } = req.body;
    console.log(req.body);

    const existingUser = await Athlete.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await Athlete.hashPassword(password);
    const newAthlete = new Athlete({
      name,
      email,
      password: hashedPassword,
      ...(sport && { sport }),
    });

    await newAthlete.save();

    const token = newAthlete.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(201).json({
      user: newAthlete,
      token,
      message: "Athlete registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginAthlete = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const athlete = await Athlete.findOne({ email });
    if (!athlete) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await athlete.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = athlete.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: athlete._id,
        name: athlete.name,
        email: athlete.email,
        sport: athlete.sport,
      },
      type: "Athlete",
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
    const Athlete = await Athlete.findOne({ email });
    if (!Athlete) {
      return res.status(400).json({ message: "Athlete not found" });
    }

    const hashedPassword = await Athlete.hashPassword(newPassword);
    Athlete.password = hashedPassword;
    await Athlete.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleCoachInvitation = async (req, res) => {
  try {
    const { invitationId, action } = req.body;
    const result = await handleInvitation(
      invitationId,
      action,
      req.user.email,
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllInvitations = async (req, res) => {
  try {
    const invitations = await invitationModel
      .find({ email: req.user.email })
      .populate("invitedBy", "name email");
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find()
      .select("-password") // 🔒 exclude sensitive field
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All athletes fetched successfully",
      count: athletes.length,
      data: athletes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch athletes",
      error: error.message,
    });
  }
};

export const profile = async(req, res) => {
  try {
    const athlete = await Athlete.findOne({ email: req.user.email }).select("-password");
    
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: athlete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

export const getAthleteById = async(req, res) => {
  try {
    const { athleteId } = req.params;
    
    const athlete = await Athlete.findById(athleteId).select("-password");
    
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.status(200).json({
      success: true,
      message: "Athlete profile fetched successfully",
      data: athlete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch athlete profile",
      error: error.message,
    });
  }
};