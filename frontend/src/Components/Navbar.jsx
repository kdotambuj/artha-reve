import React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {


  const user = false
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
        <div className="text-2xl font-bold">
          Job <span className="text-orange-400">Doodle</span>
        </div>

        <div className="flex gap-20 ">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/jobs'}> Jobs</Link></li>
            <li>Browse</li>
          </ul>

           {!user?
           (
            <div className="flex gap-2">
              <Link to={'/login'}><Button className="bg-orange-500 text-white cursor-pointer" >Login</Button></Link>
              <Link to="/signup"><Button className="cursor-pointer">Signup</Button></Link>
            </div>
           ):
            <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>


            <PopoverContent className="mr-5 w-[250px]">

             <div className="flex flex-col">
              <div className="flex gap-5 h-[50px] items-center">
              <Avatar >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

             <div className="flex flex-col">
              <h4 className="font-medium">Ambuj Kulshrestha</h4>
              <p className="text-gray-500 text-sm text-muted-foreground">Student</p>
              </div>
               


              </div>


              <div className="flex ">
                <div className="flex items-center">
                <User2/>
                <Button className="cursor-pointer text-sm" variant="link">View Profile</Button>

                </div>

              </div>

              <div className="flex">
                <div className="flex items-center">
                <LogOut/>
                <Button className="cursor-pointer text-sm" variant="link">Logout</Button>

                </div>

              </div>

              </div>

              
              
              
              
            
              
            </PopoverContent>
          </Popover>
}
          



        </div>
      </div>
    </div>
  );
}

export default Navbar;
