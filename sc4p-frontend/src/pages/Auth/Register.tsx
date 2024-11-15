import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import Logo from "../../images/logo.png";

import { Button, Input } from "@nextui-org/react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmEmail: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  homePhone: string;
  cellPhone: string;
  workPhone: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Emails do not match")
    .required("Confirm email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  homePhone: Yup.string().required("Home phone number is required"),
  cellPhone: Yup.string().required("Cell phone number is required"),
  workPhone: Yup.string().required("Work phone number is required"),
});

const Register: React.FC = () => {
  const { registerUser, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await registerUser(
        values.name,
        values.email,
        values.password,
        values.address,
        values.city,
        values.state,
        values.zip,
        values.homePhone,
        values.cellPhone,
        values.workPhone,
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex">
        <img
          src={Logo}
          className="w-[55.6px] h-[109.7px] mt-[25.98px] ml-[33.9px]"
        ></img>
        <h1 className="w-[160.64px] h-[78px] mt-[48.4px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593]">
          2nd Chance For Pets
        </h1>
      </div>
      <h1 className="w-[400px] h-[54px] ml-[200px] mt-[10px] font-[Inter] font-extrabold text-[32px] leading-[48.41px]">
        Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[repeat(2,_350px)] grid-rows-[repeat(3,_auto)] gap-x-[40px] gap-y-[8px] ml-[200px]">
          <div>
            <label
              htmlFor="name"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Name
            </label>
            <Input type="text" id="name" {...register("name")} />
            {errors.name != null && (
              <FormError>{errors.name.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="workPhone"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Work Phone
            </label>
            <Input type="text" id="workPhone" {...register("workPhone")} />
            {errors.workPhone != null && (
              <FormError>{errors.workPhone.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Password
            </label>
            <Input type="password" id="password" {...register("password")} />
            {errors.password != null && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Email
            </label>
            <Input type="email" id="email" {...register("email")} />
            {errors.email != null && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmEmail"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Confirm Email
            </label>
            <Input
              type="email"
              id="confirmEmail"
              {...register("confirmEmail")}
            />
            {errors.confirmEmail && (
              <FormError>{errors.confirmEmail.message}</FormError>
            )}
          </div>
        </div>
        <div className="ml-[200px]">
          <label
            htmlFor="address"
            className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
          >
            Address
          </label>
          <Input type="text" id="address" {...register("address")} />
          {errors.address != null && (
            <FormError>{errors.address.message}</FormError>
          )}
        </div>
        <div className="flex ml-[200px] gap-[40px]">
          <div>
            <label
              htmlFor="city"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              City
            </label>
            <Input type="text" id="city" {...register("city")} />
            {errors.city != null && (
              <FormError>{errors.city.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              State
            </label>
            <Input type="text" id="state" {...register("state")} />
            {errors.state != null && (
              <FormError>{errors.state.message}</FormError>
            )}
          </div>
          <div>
            <label
              htmlFor="zip"
              className="w-[121px] h-[29px] font-[Inter] text-[17px] font-bold leading-[39.05px]"
            >
              Zip
            </label>
            <Input type="text" id="zip" {...register("zip")} />
            {errors.zip != null && <FormError>{errors.zip.message}</FormError>}
          </div>
        </div>
        {/* <div>
          <label htmlFor="homePhone">Home Phone</label>
          <Input type="text" id="homePhone" {...register("homePhone")} />
          {errors.homePhone != null && (
            <FormError>{errors.homePhone.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="cellPhone">Cell Phone</label>
          <Input type="text" id="cellPhone" {...register("cellPhone")} />
          {errors.cellPhone != null && (
            <FormError>{errors.cellPhone.message}</FormError>
          )}
        </div> */}

        {error && <FormError>{error}</FormError>}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-[#A377DC] text-white w-[100px] h-[42px] p-[16px_24px] gap-[14px] rounded-[15px] mt-[15px] font-[Inter] font-semibold ml-[200px]"
        >
          {isSubmitting ? "Submitting" : "Sign Up"}
        </Button>
      </form>
      <p className="ml-[200px] font-[Inter] text-[14px] font-semibold leading-[41.78px]">
        Already have an account?{" "}
        <span className="text-[#5F17BE] underline">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
