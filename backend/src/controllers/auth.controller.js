import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/index.js";

import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  console.log("first");
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
  console.log("first");

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
  res.json({ message: "Login not implemented yet" });
};

export const logout = async (req, res) => {
  res.json({ message: "Logout not implemented yet" });
};

export const check = async (req, res) => {
  res.json({ message: "Check not implemented yet" });
};
