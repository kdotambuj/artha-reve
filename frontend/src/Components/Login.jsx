import React, { useState } from "react";
import Navbar from "./Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/redux/authSlice";
import store from "/redux/store";
import { Loader2 } from "lucide-react";

function Login() {


  const navigate = useNavigate()
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch()

  const [input,setInput] =  useState({
    "email":"",
    "password":"",
    "role":""
  })


  const changeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault()

   

    try {

      dispatch(setLoading(true))

      const data = {
        "email":input.email,
        "password":input.password,
        "role":input.role
      }

      const res = await axios.post(`${USER_API_ENDPOINT}/login`,data,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })

      if(res.data.success){
        navigate("/")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
    finally{
      dispatch(setLoading(false))
    }
  }




  
  return (
    <div>
      <Navbar />

      <div className="flex mt-20 items-center justify-center  max-w-7xl mx-auto">
        <form onSubmit={onSubmitHandler}>
          <h1 className="font-bold text-xl text-center mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="xyz@gmail.com" />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="text" value={input.password} onChange={changeEventHandler} name="password" placeholder="Password" />
          </div>

          <div className="flex items-center justify-center gap-4 ">
            
            <div className="flex items-center space-x-2 justify-center">
            <Input
            type="radio"
            name="role"
            value="student"
            className="cursor-pointer"
            checked={input.role=="student"}
            onChange={changeEventHandler}
            
            />
            <Label>Student</Label>
            </div>

            <div className="flex items-center space-x-2 justify-center">
            <Input
            type="radio"
            name="role"
            value="recruiter"
            className="cursor-pointer"
            checked={input.role=="recruiter"}
            onChange={changeEventHandler}
            
            />
            <Label>Recruiter</Label>
            </div>

          </div>

          {loading?<Button className="w-full my-4"> <Loader2 className="animate-spin"/>Please Wait</Button>:<Button className="w-full my-4" type="submit">Login</Button>}


          
          <span className="text-sm">Don't have an account? <Link className="text-blue-600 underline" to="/signup">Signup</Link></span>

        </form>
      </div>
    </div>
  );
}

export default Login;
