import React from 'react'
import { Badge } from "@/components/ui/badge"


function LatestJobCard() {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>

        <div>
        <h1 className='font-medium text-lg '>Company Name</h1>
        <p className='text-sm text-gray-500 '>India</p>
        </div>

        <div>
            <h1 className='font-bold text-lg my-2 '>Job Title</h1>
            <p className='text-sm text-gray-600 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</p>
        </div>

        <div className='flex items-center gap-2 mt-4 '>
        <Badge variant={"ghost"} className="text-orange-400 font-medium ">12 Postitions</Badge>
        <Badge variant={"ghost"} className="text-purple-600 font-medium ">Part Time</Badge>
        <Badge variant={"ghost"} className="text-blue-400 font-medium ">24 LPA</Badge>


        </div>


    </div>
  )
}

export default LatestJobCard