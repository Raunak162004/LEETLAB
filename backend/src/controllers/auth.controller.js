import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/index.js";

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      },
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "error connecting user", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // haker ko ye nhi btatae ki password match nhi kr ra
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      success: true,
      message: "User login successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "login unsuccesful", error });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "logout unsuccesful", error });
  }
};
export const check = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Check route error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token", error });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // haker ko ye nhi btatae ki password match nhi kr ra
    }
    if (newPassword !== confirmPassword) {
      throw new ApiError(402, "Password and Confirm password are not match.");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res
      .status(200)
      .json({
        message: "Password updated successfully.  Login with new password",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating password" });
  }
};
export const changeRole = async (req, res) => {
  try {
    const { email} = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newRole = user.role === "ADMIN" ? UserRole.USER : UserRole.ADMIN;

   const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        role: newRole,
      },
    });
    return res.status(200).json({
      message: "Role switched successfully",
      user: updatedUser,
      role: updatedUser.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error switching role" });
  }
};