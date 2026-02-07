import mongoose from "mongoose";

const invitedUserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
    invitedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Invitation', invitedUserSchema);