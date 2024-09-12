import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    // check if user already applied for this job
    const exisitingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (exisitingApplication) {
      return res.status(400).json({
        message: "Already applied",
        success: false,
      });
    }

    // check if job doesn't exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicatn: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
        options: { sort: { createdAt: -1 } },
      });



      if (!application){
        return res.status(404).json({
            message:"No Applications",
            success:false
        })
      }

      return res.status(200).json({
        application,
        success:true
    })
  } catch (error) {
    console.log(error);
  }
};


// admin can see the applicants
export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params // job id
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }

        })

        if (!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
}


export const updateStatus = async (req,res)=>{
    try {

        const {status} = req.body
        const applicationId = req.params.id

        if (!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }

        // find application by application id and update
        const application = await Application.findOne({_id:applicationId})

        if (!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }


        // update the status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message:"Status updated",
            success:true
        })

        
    } catch (error) {
        console.log(error)
    }
}
