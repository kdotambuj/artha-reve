import React from "react";
import Navbar from "./Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "/redux/store";
import { setLoading } from "/redux/authSlice";
import { Loader2 } from "lucide-react";


function Signup() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(store=>store.auth)

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password:"",
    role: "student",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };


  const submitHandler = async (e)=>{
          e.preventDefault()


         

           const formData  = new FormData()
           formData.append("fullname",input.fullname)
           formData.append("phoneNumber",input.phoneNumber)
           formData.append("password",input.password)
           formData.append("role",input.role)
           formData.append("email",input.email)
           if (input.file){
            formData.append("file",input.file)
           }


          try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
              headers:{
                "Content-Type":"multipart/form-data"
              },
              withCredentials:true
            })

            if (res.data.success){
              navigate("/login")
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

      <div className="flex items-center justify-center  max-w-7xl mx-auto">
        <form onSubmit={submitHandler} >
          <h1 className="font-bold text-xl text-center mb-5">Signup</h1>
          <div className="my-2 w-[300px]">
            <Label>Full Name</Label>
            <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Arun Kumar" />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="xyz@gmail.com" />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="73XXXX56" />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="text" name="password" value={input.password} onChange={changeEventHandler} placeholder="Password" />
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
                checked={input.role=="recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Recruiter</Label>
            </div>
          </div>

          <div className="flex mt-5 items-center gap-2">
            <Label>Profile</Label>
            <Input accept="image/*" onChange={changeFileHandler} type="file" className="cursor-pointer" />
          </div>

          {
            loading?<Button className="w-full my-4"><Loader2 className="animate-spin"/>Please Wait</Button>:<Button className="w-full my-4" type="submit">
            Signup
          </Button>
          }

          

          <span className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-600 underline" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
