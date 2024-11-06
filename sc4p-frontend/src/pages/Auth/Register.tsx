import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone: string;
  cell_phone: string;
  work_phone: string;
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
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "ZIP code must be exactly 5 digits")
    .required("ZIP code is required"),
  home_phone: Yup.string().required("Home phone is required"),
  cell_phone: Yup.string().required("Cell phone is required"),
  work_phone: Yup.string().required("Work phone is required"),
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
        values.home_phone,
        values.cell_phone,
        values.work_phone,
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address")} />
          {errors.address && <FormError>{errors.address.message}</FormError>}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" {...register("city")} />
          {errors.city && <FormError>{errors.city.message}</FormError>}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" id="state" {...register("state")} />
          {errors.state && <FormError>{errors.state.message}</FormError>}
        </div>
        <div>
          <label htmlFor="zip">ZIP Code</label>
          <input type="text" id="zip" {...register("zip")} />
          {errors.zip && <FormError>{errors.zip.message}</FormError>}
        </div>
        <div>
          <label htmlFor="home_phone">Home Phone</label>
          <input type="text" id="home_phone" {...register("home_phone")} />
          {errors.home_phone && (
            <FormError>{errors.home_phone.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="cell_phone">Cell Phone</label>
          <input type="text" id="cell_phone" {...register("cell_phone")} />
          {errors.cell_phone && (
            <FormError>{errors.cell_phone.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="work_phone">Work Phone</label>
          <input type="text" id="work_phone" {...register("work_phone")} />
          {errors.work_phone && (
            <FormError>{errors.work_phone.message}</FormError>
          )}
        </div>
        {error && <FormError>{error}</FormError>}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting" : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
