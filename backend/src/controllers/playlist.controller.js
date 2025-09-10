import { db } from "../libs/db.js";

export const getAllListDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const allList = await db.playlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    if(!allList){
      return res.status(404).json({
        success: false,
        message: "No playlist found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Every playlist for our user fetched successfully",
      allList,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error finding all the playlist for a user",
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await db.playlist.findMany({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
  

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No such playlist available",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Playlist details retrieved successfully",
      playlist,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error retrieving playlist details",
      error,
    });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const deleted_playlist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });
    if (!deleted_playlist) {
      return res.status(404).json({
        success: false,
        message: "No such playlist available to delete",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deleted_playlist,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error deleting playlist",
    });
  }
};

export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });


    return res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error creating playlist",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Error finding problemIds",
      });
    }
 
  
    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId: playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "Problem(s) deleted from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error removing problem from playlist:", error.message);
    res.status(500).json({ error: "Failed to remove problem from playlist" });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body; // Accept an array of problem IDs

  try {
    // Ensure problemIds is an array
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }

    // Create records for each problem in the playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });


    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problems to playlist:", error.message);
    res.status(500).json({ error: "Failed to add problems to playlist" });
  }
};