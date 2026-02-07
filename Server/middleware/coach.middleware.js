import jwt from "jsonwebtoken";
import coach from "../models/coach.model.js";

const authenticateCoach = async (req, res, next) => {   
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const coachUser = await coach.findById(decoded._id).select("-password");
        if (!coachUser) {
            return res.status(401).json({ message: "Invalid token. Coach not found." });
        }       
        req.body = coachUser;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", error: error.message });
    }   
};

export default authenticateCoach;