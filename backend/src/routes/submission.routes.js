import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmissionsforaUser,getallSubmissionForProblembyUser,getTheSubmissionsCountForProblem} from "../controllers/submission.controller.js";
import express from "express";

const submissionRoutes= express.Router();

submissionRoutes.get("/get-all-submissions",authMiddleware,getAllSubmissionsforaUser); // replaced getAllSubmissions
submissionRoutes.get("/get-submissions/:problemId",authMiddleware,getallSubmissionForProblembyUser) //replaced getSubmissionsForProblem 
submissionRoutes.get("/get-submissions-count/:problemId",authMiddleware, getTheSubmissionsCountForProblem) //replaced with getAllTheSubmissionsForProblem 

export default submissionRoutes;