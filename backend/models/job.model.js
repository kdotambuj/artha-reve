import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    requirements: [{ type: String}],
    experienceLevel:{type:Number,required:true},
    salary: { type: Number, required: true },
    jobType: { type: String, required: true },
    position: { type: String, required: true },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]

},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema)