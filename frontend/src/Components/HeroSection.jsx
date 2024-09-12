import React from 'react'
import { Button } from './ui/button'
import { Search, SearchIcon } from 'lucide-react'

function HeroSection() {
  return (
    <div className='text-center'>

        <div className='flex flex-col gap-5 my-10 '>

        

        <span className='px-4 mx-auto py-1.5  rounded-full bg-gray-100 text-orange-500 font-medium'>No.1 Job Hunting Site</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-purple-600'>Dream Job</span></h1>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nemo nihil </span>
        
        <div className='rounded-l-full shadow-lg border border-gray-200 pl-3 rounded-full gap-4  flex items-center mx-auto rounded-r-full w-[40%]'>
            <input 
            type="text"
            placeholder='Find your dream Job'
            className='outline-none w-full border-none'
            />
            <Button className="bg-purple-600 rounded-r-full"> <SearchIcon/></Button>
        </div>

        </div> 
    </div>
  )
}

export default HeroSection