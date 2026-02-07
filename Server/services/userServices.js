import Athlete from "../models/athlete.model.js";
import Coach from "../models/coach.model.js";
import invitationModel from "../models/invitation.model.js";

export const handleInvitation = async (invitationId, action, userEmail) => {
  try {
    if (!invitationId || !action) {
      throw new Error("Invitation ID and action are required");
    }

    const invitation = await invitationModel.findById(invitationId);
    if (!invitation) {
      throw new Error("Invitation not found");
    }

    if (invitation.status !== "pending") {
      throw new Error("Invitation already responded to");
    }

    const user = await Athlete.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found");
    }

    if (action === "accept") {
      invitation.status = "accepted";
      await invitation.save();


      await Coach.findByIdAndUpdate(
        invitation.invitedBy,
        { $addToSet: { disciples: user._id } },
        { new: true }
      );

      return { message: "Invitation accepted and user added to project" };
    } else if (action === "decline") {
      invitation.status = "declined";
      await invitation.save();
      return { message: "Invitation declined" };
    } else {
      throw new Error("Invalid action");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
