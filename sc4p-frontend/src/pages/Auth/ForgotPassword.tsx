import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import { Button, Input } from "@nextui-org/react";
import Logo from "../../images/logo.png";

interface FormValues {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const { forgotPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await forgotPassword(values.email);
      setMessage("Check your email for further instructions");
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setError(err.message);
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
        <h1 className="w-[400px] h-[54px] ml-[200px] mt-[50px] font-[Inter] font-extrabold text-[32px] leading-[48.41px]">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-[200px]">
          <div>
            <label
              htmlFor="email"
              className="w-[380px] inline-block h-[29px] font-[Inter] text-[17px] font-bold leading-[19.05px] mt-[10px] mb-[24px]"
            >
              Enter your email address or phone number and we will send you the
              reset instruction
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

          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#A377DC] text-white w-[160px] h-[42px] p-[16px_24px] gap-[14px] rounded-[15px] mt-[15px] font-[Inter] font-semibold"
          >
            {isSubmitting ? "Submitting" : "Reset Password"}
          </Button>
          {message && <p>{message}</p>}
        </form>
        <p className="ml-[200px] font-[Inter] font-semibold text-[#5F17BE] text-[14px] mt-[6px]">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
      <div className="w-[530.12px] bg-[#E6D1FF]"></div>
    </div>
  );
};

export default ForgotPassword;
