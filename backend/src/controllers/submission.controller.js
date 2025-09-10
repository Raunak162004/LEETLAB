import { db } from "../libs/db.js";

export const getAllSubmissionsforaUser= async (req, res) => { //is userid ke sare submission nikalo leetlab se
    try {
        const userId= req.user.id;
        
        const submissions = await db.submission.findMany({
            where:{
                userId:userId
            }
        })
       return res.status(200).json({
            success:true,
            message:"All submissions by particular user fetched successfully!",
            submissions
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message : "Error while getting all submissions by our user"
        })
        
    }
    
}
export const getallSubmissionForProblembyUser  = async (req, res) => { //is user ke is problem ke sare submission nikalo - successful or failed
    try {
        const userId = req.user.id;
        const problemId= req.params.problemId;
        const submissions = await db.submission.findMany({
          where: {
            userId: userId,
            problemId:problemId
          },
        });
         return res.status(200).json({
            success: true,
            message: "all submissions for a problem by user fetched successfully!",
            submissions,
          });

        
    } catch (error) {
         return res.status(400).json({
           success: false,
           message: "Error while getting all submissions for problem for our user",
         });
        
    }
};

export const getTheSubmissionsCountForProblem = async (req, res) => { // get submissionCount for a problem  
    try {
        const problemId =req.params.problemId;
        const submissionsCount= await db.submission.count({
            where:{
                problemId
            }
        })
          res.status(200).json({
            success: true,
            message: "submission Count for a problem by user fetched successfully!",
            count : submissionsCount,
          });
        
        
    } catch (error) {
         return res.status(400).json({
           success: false,
           message: "Error while getting submissions Count of a user for a particular problem ",
         });
        
    }
};