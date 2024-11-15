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
      const alal = await login(values.email, values.password);
      console.log(alal);
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
            width: "110px",
            height: "54px",
            marginTop: "10px",
            fontFamily: "Inter",
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "48.41px",
          }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "200px" }}>
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
              Username
            </label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              style={{ width: "10px" }}
            />
            {errors.email != null && (
              <FormError>{errors.email.message}</FormError>
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
            {errors && <FormError>{error}</FormError>}
          </div>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "29.36px",
              textAlign: "left",
              color: "#5F17BE",
            }}
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <Button
            disabled={isSubmitting}
            type="submit"
            style={{
              background: "#A377DC",
              color: "white",
              width: "105px",
              height: "42px",
              padding: "16px 24px 16px 24px",
              gap: "14px",
              borderRadius: "15px",
              marginTop: "8px",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            {isSubmitting ? "Submitting" : "Login"}
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "200px",
            marginRight: "200px",
          }}
        >
          <hr style={{ flex: 1, borderColor: "#ccc" }} />
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "41.78px",
              margin: "4px",
            }}
          >
            Or login with
          </span>
          <hr style={{ flex: 1, borderColor: "#ccc" }} />
        </div>
        <div
          className="flex"
          style={{
            marginLeft: "200px",
          }}
        >
          <Button
            style={{
              width: "160px",
              height: "44px",
              borderRadius: "15px",
              border: "2px 0px 0px 0px",
              marginRight: "30px",
              background: "white",
              borderColor: "#A33D24",
              borderWidth: "2px",
              borderStyle: "solid",
              color: "#A33D24",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "41.78px",
            }}
          >
            <img
              src={Google}
              alt=""
              style={{
                width: "24.15px",
                height: "24.15px",
                marginRight: "12px",
              }}
            />
            Google
          </Button>
          <Button
            style={{
              width: "160px",
              height: "44px",
              borderRadius: "15px",
              border: "2px 0px 0px 0px",
              background: "white",
              borderColor: "#254984",
              borderWidth: "2px",
              borderStyle: "solid",
              color: "#254984",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "41.78px",
            }}
          >
            <img
              src={Facebook}
              alt=""
              style={{
                width: "24.15px",
                height: "24.15px",
                marginRight: "12px",
              }}
            />
            Facebook
          </Button>
        </div>
        <p
          style={{
            marginLeft: "200px",
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "41.78px",
          }}
        >
          Don&apos;t have an account?{" "}
          <span style={{ color: "#5F17BE", textDecoration: "underline" }}>
            <Link to="/register">Sign Up</Link>
          </span>
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

export default Login;
