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
          style={{
            width: "55.6px",
            height: "109.7px",
            marginTop: "25.98px",
            marginLeft: "33.9px",
          }}
        ></img>
        <h1
          style={{
            width: "160.64px",
            height: "78px",
            marginTop: "48.4px",
            marginLeft: "15px",
            fontFamily: "Inter",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "28.73px",
            textAlign: "left",
            color: "#5E3593",
          }}
        >
          2nd Chance For Pets
        </h1>
      </div>
      <h1
        style={{
          marginLeft: "200px",
          width: "110px",
          height: "54px",
          marginTop: "10px",
          fontFamily: "Inter",
          fontSize: "32px",
          fontWeight: "800",
          lineHeight: "48.41px",
        }}
      >
        Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 350px)",
            gridTemplateRows: "repeat(3, auto)",
            columnGap: "40px",
            rowGap: "8px", // Space between columns

            marginLeft: "200px",
          }}
        >
          <div>
            <label
              htmlFor="name"
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
        <div
          style={{
            marginLeft: "200px",
          }}
        >
          <label
            htmlFor="address"
            style={{
              width: "121px",
              height: "29px",
              fontFamily: "Inter",
              fontSize: "17px",
              fontWeight: "700",
              lineHeight: "39.05px",
            }}
          >
            Address
          </label>
          <Input type="text" id="address" {...register("address")} />
          {errors.address != null && (
            <FormError>{errors.address.message}</FormError>
          )}
        </div>
        <div
          className="flex"
          style={{
            marginLeft: "200px",
            gap: "40px",
          }}
        >
          <div>
            <label
              htmlFor="city"
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
              style={{
                width: "121px",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "39.05px",
              }}
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
          style={{
            background: "#A377DC",
            color: "white",
            width: "100px",
            height: "42px",
            padding: "16px 24px 16px 24px",
            gap: "14px",
            borderRadius: "15px",
            marginTop: "15px",
            fontFamily: "Inter",
            fontWeight: "600",
            marginLeft: "200px",
          }}
        >
          {isSubmitting ? "Submitting" : "Sign Up"}
        </Button>
      </form>
      <p
        style={{
          marginLeft: "200px",
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "41.78px",
        }}
      >
        Already have an account?{" "}
        <span style={{ color: "#5F17BE", textDecoration: "underline" }}>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
