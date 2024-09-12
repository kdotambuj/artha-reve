import React from 'react'
import LatestJobCard from './LatestJobCard'


const randomJobs = [1,2,3,4,5,6,7,8]

function LatestJob() {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold '><span className='text-purple-600'>Latest & Top </span>Job Opening</h1>
        {/* Multiple job cards will display here */}
        <div className='grid grid-cols-3 gap-4 my-5 '>
       
        {
            randomJobs.slice(0,6).map((job,index)=>{
                return <LatestJobCard />
            })
        }
         </div>



    </div>
  )
}

export default LatestJob