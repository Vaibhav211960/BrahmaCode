import { validationResult } from "express-validator";
import Coach from "../models/coach.model.js";
import generateOtp from "../utils/OTPGenerator.js";
import transporter from "../config/transporter.js";
import otpStore from "../utils/OTPStore.js";

export const sendotp = async (req, res) => {
  try {
        const { name, email, password, category, level, coachInstitute } = req.body;

        // 1. Check if coach already exists
        const existingCoach = await Coach.findOne({ email });
        if (existingCoach) return res.status(400).json({ message: "Coach already exists" });

        // 2. Hash Password (using the static method from your model)
        const hashedPassword = await Coach.hashPassword(password);

        // 3. Create Coach
        const newCoach = await Coach.create({
            name,
            email,
            password: hashedPassword,
            category,
            level,
            coachInstitute
        });

        // 4. Generate Token
        const token = newCoach.generateAuthToken();

        res.status(201).json({ token, coach: { id: newCoach._id, name: newCoach.name } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const verifyOtpAndCompleteRegistration = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const { otp: storedOtp, expiresAt } = record;
    if (Date.now() > expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp != storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email);

    const hashedPassword = await coachModel.hashPassword(password);
    const newCoach = new coachModel({
      name,
      email,
      password: hashedPassword,
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

    // FIX: Changed variable name to lowercase 'coach' 
    // to avoid conflict with the Model name 'Coach'
    const coach = await Coach.findOne({ email }); 
    
    if (!coach) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Use the lowercase 'coach' instance for methods
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
      token,
      user: { id: coach._id, name: coach.name, role: "coach" }, // Added role for your frontend redirection
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const { otp: storedOtp, expiresAt } = record;
    if (Date.now() > expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp != storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    otpStore.delete(email);
    res
      .status(200)
      .json({ result: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, expiresAt });
    await transporter.sendMail({
      to: email,
      subject: "Your OTP verification code",
      html: `
                <!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" 
                 style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

            <tr>
              <td align="center" style="font-size:24px; font-weight:bold; color:#333333;">
                Email Verification
              </td>
            </tr>

            <tr>
              <td style="padding:20px 0; font-size:15px; color:#555555; line-height:22px; text-align:center;">
                Hello, <span style="text-transform: capitalize;">${name}</span><br/>
                Use the verification code below to complete your signup. <br/>
                This OTP is valid for the next 
                <span style="color:#d4af37; font-weight:bold;">5 minutes</span>.
              </td>
            </tr>

            <tr>
              <td align="center" 
                  style="
                    background:linear-gradient(135deg, #000000, #3a3a3a); 
                    border-left:5px solid #d4af37; 
                    border-radius:10px; 
                    padding:25px 0; 
                    color:#ffffff;
                    margin-top:20px;">
                
                <span style="
                    font-size:32px; 
                    font-weight:bold; 
                    letter-spacing:6px; 
                    color:#d4af37;">
                    ${otp}
                </span>

              </td>
            </tr>

            <tr>
              <td style="padding:25px 10px; font-size:14px; color:#555555; text-align:center; line-height:22px;">
                If you didn't request this, you can safely ignore this email.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:20px; font-size:12px; color:#888888;">
                © 2025 Arena FitCheck. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>

            `,
    });

    res.status(200).json({ message: "OTP resent to email for verification" });
  } catch (error) {
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
