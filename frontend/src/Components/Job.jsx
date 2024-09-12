import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BotIcon, LogInIcon } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

function Job() {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 '>

        <div className='flex items-center justify-between'>

        
        <p>2 days ago</p>
        <Button variant="outline" size="icon" className="rounded-full"><Bookmark/></Button>
        </div>

        <div className='flex items-center gap-8 my-2'>

        
        <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <BotIcon/>
            </Avatar>
        </Button>

        <div>
            <h1>Company Name</h1>
            <p>India</p>

        </div>

        </div>
    
    </div>
  )
}

export default Job