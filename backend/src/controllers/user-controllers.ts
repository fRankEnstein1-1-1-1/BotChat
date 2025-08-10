import Users from "../models/user.js";
import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { maketoken } from "../utils/token-manager.js";

export const getallUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Users.find();
    return res.status(200).json({ message: "ok!", users });
  } catch (error) {
    return res.status(500).json({ message: "Error Fetching Users!" });
  }
};

export const getSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password, email } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists!" });
    }

    const hashedPassword = await hash(password, 10);
    const user = new Users({ name, password: hashedPassword, email });
    await user.save();

    const token = maketoken(user._id.toString(), user.email, "7d");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Clear old cookie
    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: "lax",
    });

    // Set new cookie
    res.cookie("auth_token", token, {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      expires,
      secure: false, // Set to true in production (HTTPS)
    });

    return res.status(201).json({
      message: "Signed up!",
      id: user._id.toString(),
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Signing Up!" });
  }
};

export const getLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, email } = req.body;
    const signedUser = await Users.findOne({ email });

    if (!signedUser) {
      return res.status(402).json({ message: "Sign up first!" });
    }

    const isPasswordCorrect = await compare(password, signedUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    const token = maketoken(signedUser._id.toString(), signedUser.email, "7d");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: "lax",
    });

    res.cookie("auth_token", token, {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      expires,
      secure: false,
    });

    return res.status(200).json({
      message: "Logged in!",
      name: signedUser.name,
      email: signedUser.email,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Logging In!" });
  }
};

export const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signedUser = await Users.findById(res.locals.jwtData.id);
    if (!signedUser) {
      return res.status(401).json({ message: "Token invalid or user not found" });
    }

    return res.status(200).json({
      message: "Authentication successful",
      name: signedUser.name,
      email: signedUser.email,
    });

  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(500).json({ message: "Error verifying authentication status." });
  }
};

export const logoutuser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signedUser = await Users.findById(res.locals.jwtData.id);
    if (!signedUser) {
      return res.status(401).json({ message: "User not found or token invalid" });
    }

    res.clearCookie("auth_token", {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logout successful",
      name: signedUser.name,
      email: signedUser.email,
    });

  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Error logging out." });
  }
};
