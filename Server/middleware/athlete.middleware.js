import jwt from "jsonwebtoken";
import Athlete from "../models/athlete.model.js";

const authenticate = async (req, res, next) => {    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const athlete = await Athlete.findById(decoded._id
        ).select("-password");
        if (!athlete) {
            return res.status(401).json({ message: "Invalid token. Athlete not found." });
        }   
        req.user = athlete;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", error: error.message });
    }       
};

export default authenticate;