"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { useMutation } from "react-query";
import { setCookie } from "cookies-next";

interface InputItem {
  id: number;
  label: string;
  type: string;
}
const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    showPass: false,
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const router = useRouter();
 const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/Api/login", {
        username: loginData.username,
        password: loginData.password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCookie('token', data.token, {
        maxAge: 3600 * 3, 
        path: '/'
      });
      router.replace("/posts");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("مشکلی به وجود آمده است.");
      }
    }
  });

  const LoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({ username: false, password: false });
    if (!loginData.username || !loginData.password) {
      toast.error("جهت ورود، وارد کردن اطلاعات خواسته شده الزامی میباشد !");
      setErrors({
        username: !loginData.username,
        password: !loginData.password,
      });
      return;
    }
    mutation.mutate();
  };
  const inputs: InputItem[] = [
    { id: 1, label: "نام کاربری", type: "text" },
    { id: 2, label: "رمز عبور", type: "password" },
  ];
  return (
    <div className=" flex flex-col-reverse sm:flex-row bg-white w-[90%] max-w-[600px] rounded-xl overflow-hidden border-1 border-[#49516E]">
      <form
        onSubmit={LoginHandler}
        className="flex flex-col w-[100%] sm:w-[60%]  p-10 "
      >
        <h1 className="text-[#49516E] text-[18px] font-bold mb-10 mx-auto">
          ورود به سامانه{" "}
        </h1>
        {inputs.map((item) => (
          <div className="relative">
            <Input
              key={item.id}
              type={loginData.showPass ? "text" : item.type}
              label={item.label}
              variant="bordered"
              labelPlacement="outside"
              value={item.id === 1 ? loginData.username : loginData.password}
              onChange={(e) => {
                item.id == 1
                  ? setLoginData({ ...loginData, username: e.target.value })
                  : setLoginData({ ...loginData, password: e.target.value });
              }}
              className="my-6"
              autoComplete="off"
            />
            <span
              onClick={() =>
                setLoginData({ ...loginData, showPass: !loginData.showPass })
              }
              className="absolute top-9 left-5 cursor-pointer"
            >
              {item.type === "password" &&
                (loginData.showPass ? (
                  <FaRegEyeSlash className="tex-[#49516E]" />
                ) : (
                  <FaRegEye className="text-[#49516E]" />
                ))}
            </span>
          </div>
        ))}
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-[#49516E] to-blue-500 text-white shadow-lg my-6 font-bold"
        >
          ورود
        </Button>
      </form>
      <Image
        src="/blueBack.jpg"
        alt="teal background"
        width={800}
        height={500}
        quality={90}
        className="sm:w-[250px] sm:!h-[422px] w-[100%] !h-[140px]"
      />
    </div>
  );
};

export default Login;
