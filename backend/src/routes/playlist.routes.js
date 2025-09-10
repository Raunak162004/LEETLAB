import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllListDetails,
  getPlayListDetails,
  createPlayList,
  addProblemToPlaylist,
  deletePlaylist,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";
import express from "express";

const playlistRoutes = express.Router();

playlistRoutes.get("/", authMiddleware, getAllListDetails);
playlistRoutes.get("/:playlistId", authMiddleware, getPlayListDetails);
playlistRoutes.post("/create-playlist", authMiddleware, createPlayList);
playlistRoutes.post(
  "/:playlistId/add-problem",
  authMiddleware,
  addProblemToPlaylist
);
playlistRoutes.delete("/:playlistId", authMiddleware, deletePlaylist);
playlistRoutes.delete(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

export default playlistRoutes;