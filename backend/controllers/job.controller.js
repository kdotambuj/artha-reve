import { IdentificationIcon } from "@heroicons/react/24/outline"
import {Job} from "../models/job.model.js"

//admin
export const postJob = async (req,res) =>{
    try {
        const {title,description,requirements,salary,location,experienceLevel,jobType,position,companyId} = req.body


        if (!title || !description || !requirements || !experienceLevel|| !salary || !location || !jobType || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const userId = req.id

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company:companyId,
            created_by:userId

        })

        return res.status(201).json({
            message:"Job created",
            job,
            success:true
        })


        
    } catch (error) {
        console.log(error);
        
    }
}


export const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }

        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1})
        if (!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })


    } catch (error) {
        console.log(error)
        
    }
}


// student
export const getJobById = async (req,res)=>{
    try {
       const jobId = req.params.id
       const job = await Job.findById(jobId).populate({
        path:"company"
       }).sort({createdAt:-1})

       if (!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
       }

       return res.status(200).json({
        message:"Job Found",
        job,
        success:true
    })

    } catch (error) {
        console.log(error)
        
    }
}



// how many jobs are created by admin
export const getAdminJobs = async (req,res)=>{
    try {
        const adminId = req.id
        const jobs = await Job.find({created_by:adminId})
        if (!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}