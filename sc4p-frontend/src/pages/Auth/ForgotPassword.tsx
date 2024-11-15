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
            width: "350px",
            height: "54px",
            marginTop: "50px",
            fontFamily: "Inter",
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "40.41px",
          }}
        >
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "200px" }}>
          <div>
            <label
              htmlFor="email"
              style={{
                width: "380px",
                display: "inline-block",
                height: "29px",
                fontFamily: "Inter",
                fontSize: "17px",
                fontWeight: "700",
                lineHeight: "19.05px",
                marginTop: "10px",
                marginBottom: "24px",
              }}
            >
              Enter your email address or phone number and we will send you the
              reset instruction
            </label>
            <Input type="email" id="email" {...register("email")} />
            {errors.email != null && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          {error && <FormError>{error}</FormError>}
          <Button
            disabled={isSubmitting}
            type="submit"
            style={{
              background: "#A377DC",
              color: "white",
              width: "160px",
              height: "42px",
              padding: "16px 24px 16px 24px",
              gap: "14px",
              borderRadius: "15px",
              marginTop: "15px",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            {isSubmitting ? "Submitting" : "Reset Password"}
          </Button>
          {message && <p>{message}</p>}
        </form>
        <p
          style={{
            marginLeft: "200px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#5F17BE",
            fontSize: "14px",
            marginTop: "6px",
          }}
        >
          <Link to="/login">Back to login</Link>
        </p>
      </div>
      <div
        style={{
          width: "530.12px", // Exact width
          backgroundColor: "#E6D1FF",
        }}
      ></div>
    </div>
  );
};

export default ForgotPassword;
