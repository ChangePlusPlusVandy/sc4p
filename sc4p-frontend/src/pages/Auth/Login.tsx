import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import { Input, Button } from "@nextui-org/react";
import Logo from "../../images/logo.png";
import Google from "../../images/google.png";
import Facebook from "../../images/fb.png";

interface FormValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await login(values.email, values.password);
      console.log("Login successful");
    } catch (err: any) {
      if (err.message.includes("Incorrect password")) {
        setError("The password you entered is incorrect.");
      } else if (err.message.includes("User not found")) {
        setError("No account found with this email.");
      } else {
        setError("Failed to login. Please try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <div className="flex">
          <img
            src={Logo}
            className="w-[55.6px] h-[109.7px] mt-[25.98px] ml-[33.9px]"
          ></img>
          <h1 className="w-[160.64px] h-[78px] mt-[48.4px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593]">
            2nd Chance For Pets
          </h1>
        </div>
        <h1 className="w-[110px] h-[54px] ml-[200px] mt-[10px] font-[Inter] font-extrabold text-[32px] leading-[48.41px]">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-[200px]">
          <div>
            <label
              htmlFor="email"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Username
            </label>
            <Input
              type="email"
              id="email"
              isInvalid={!!errors.email}
              {...register("email")}
              className={`font-[Inter] w-[350px] border-2 rounded-[15px] ${
                errors.email ? "border-red-500" : "border-[#AF94D3]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-[Inter]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              isInvalid={!!errors.password}
              {...register("password")}
              className={`font-[Inter] w-[350px] border-2 rounded-[15px] ${
                errors.password ? "border-red-500" : "border-[#AF94D3]"
              }`}
            />
            {error ? (
              <p className="text-red-500 text-sm mt-1 font-[Inter]">{error}</p>
            ) : (
              errors.password && (
                <p className="text-red-500 text-sm mt-1 font-[Inter]">
                  {errors.password.message}
                </p>
              )
            )}
          </div>
          <p className="font-[Inter] text-[12px] font-semibold leading-[29.36px] text-left text-[#5F17BE]">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#A377DC] text-white w-[105px] h-[42px] p-[16px_24px] gap-[14px] rounded-[15px] mt-[8px] font-[Inter] font-semibold"
          >
            {isSubmitting ? "Submitting" : "Login"}
          </Button>
        </form>
        <div className="flex items-center ml-[200px] mr-[200px]">
          <hr className="flex-1 border border-black" />
          <span className="font-[Inter] text-[14px] font-semibold leading-[41.78px] m-[4px]">
            Or login with
          </span>
          <hr className="flex-1 border border-black" />
        </div>
        <div className="flex ml-[200px]">
          <Button className="w-[160px] h-[44px] rounded-[15px] border-2 mr-[30px] bg-white border-[#A33D24] text-[#A33D24] font-[Inter] text-[14px] font-semibold leading-[41.78px]">
            <img
              src={Google}
              alt=""
              className="w-[24.16px] h-[24.15px] mr-[12px]"
            />
            Google
          </Button>
          <Button className="w-[160px] h-[44px] rounded-[15px] border-2 bg-white border-[#254984] text-[#254984] font-[Inter] text-[14px] font-semibold leading-[41.78px]">
            <img
              src={Facebook}
              alt=""
              className="w-[24.16px] h-[24.15px] mr-[12px]"
            />
            Facebook
          </Button>
        </div>
        <p className="ml-[200px] font-[Inter] text-[14px] font-semibold leading-[41.78px]">
          Don&apos;t have an account?{" "}
          <span className="text-[#5F17BE] underline">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
      <div className="w-[530.12px] bg-[#E6D1FF]"></div>
    </div>
  );
};

export default Login;
