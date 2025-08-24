import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided at decoded level" });
    }
    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        image: true,
        role: true,
        name: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Some error occured" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    if (!user && user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied- Admin only",
      });
    }
    next();
  } catch (error) {
    console.log("Error checking admin role", error);
    return res.status(501).json({
      message: "Error checking admin role",
    });
  }
};