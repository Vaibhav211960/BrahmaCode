import mongoose, { mongo } from "mongoose";
import Coach from "../models/coach.model.js";
import Athlete from "../models/athlete.model.js";
import Invitation from "../models/invitation.model.js";

export const sendInvitation = async (email, invitedBy) => {
  if (!email || !invitedBy) {
    throw new Error("Email and inviter ID are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!mongoose.Types.ObjectId.isValid(invitedBy)) {
    throw new Error("Invalid inviter ID");
  }

  console.log(invitedBy)

  const coach = await Coach.findById(invitedBy);

  if (!coach) {
    throw new Error("Inviting coach not found");
  }

  const existingInvitation = await Invitation.findOne({
    email: normalizedEmail,
    invitedBy,
    status: "pending",
  });

  if (existingInvitation) {
    throw new Error("Invitation already sent to this email");
  }

  // Create invitation
  const invitation = await Invitation.create({
    email: normalizedEmail,
    invitedBy,
    role: "athlete",
    status: "pending",
  });

  return invitation;
};
