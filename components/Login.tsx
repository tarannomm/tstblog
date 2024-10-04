"use client"
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {Input,Button} from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from 'react-icons/fa';

interface InputItem {
  id: number;
  label: string;
  type:string;
}
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[showPass,setShowPass]=useState(false);
  const router = useRouter();

  const  LoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!username || !password){
      toast.error("جهت ورود، وارد کردن اطلاعات خواسته شده الزامی میباشد !")
      return
    }
    try{
    const res=await axios.post('/Api/login',{username,password})
    if(res.status===200){
      toast.success(res.data.message)
      router.replace("/posts");
    } 
    else{
      toast.error(res.data.message)
    }
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message); 
      } else {
          toast.error("مشکلی به وجود آمده است.");
      }
  }
 
  };
  const inputs:InputItem[]=[
    {id:1,label:"نام کاربری" , type:"text"},
    {id:2,label:"رمز عبور" , type:"password"},
  ]
  return (
    <div className='flex flex-col-reverse sm:flex-row bg-white w-[90%] max-w-[600px] rounded-xl overflow-hidden  shadow-custom'>
    <form onSubmit={LoginHandler} className="flex flex-col w-[100%] sm:w-[60%]  p-10 ">
      <h1 className='text-teal-600 text-[18px] font-bold mb-10 mx-auto'>ورود به سامانه </h1>
    {inputs.map((item) => (
      <div className='relative'>
        <Input
          key={item.id}
          type={showPass?"text":item.type}
          label={item.label}
          variant="bordered"
          labelPlacement="outside"
          value={item.id===1?username:password}
          onChange={(e) =>{item.id==1? setUsername(e.target.value):setPassword(e.target.value)}}
          className='my-6'
           
        />
        <span onClick={()=>setShowPass(!showPass)} className='absolute top-9 left-5 cursor-pointer'>
           {item.type==="password" && ( showPass?<FaRegEyeSlash className='text-teal-800' />:<FaRegEye  className='text-teal-800'/>)}
        </span>
       
      
      </div>
      ))}
      <Button type='submit' radius="full" className="bg-gradient-to-tr from-teal-800 to-teal-200 text-white shadow-lg my-6 font-bold">
      ورود
    </Button>
    </form>
    <Image
        src="/tealback.avif"
        alt="teal background"
        width={800}
        height={500}
        quality={90}
        className='sm:w-[250px] sm:!h-[422px] w-[100%] !h-[140px]'
      />
    </div>
  );
};

export default Login;
