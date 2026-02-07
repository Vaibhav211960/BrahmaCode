import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ override: true });


import passport from "./config/passport.js"
import session from "express-session";

import connectToDb from "./database/connection.js";
connectToDb();

import cookieParser from "cookie-parser";
import cors from "cors";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // set your client origin
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);


app.use(passport.initialize())
app.use(passport.session())

import AthleteRoutes from "./routes/athlete.routes.js"
import CoachRoutes from "./routes/coach.routes.js"

app.use("/athletes", AthleteRoutes)
app.use("/coaches", CoachRoutes)

export default app;