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
  }, [currentUser, navigate]);

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
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
          {errors.name != null && <FormError>{errors.name.message}</FormError>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email != null && (
            <FormError>{errors.email.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password != null && (
            <FormError>{errors.password.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword != null && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address")} />
          {errors.address != null && (
            <FormError>{errors.address.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" {...register("city")} />
          {errors.city != null && <FormError>{errors.city.message}</FormError>}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" id="state" {...register("state")} />
          {errors.state != null && (
            <FormError>{errors.state.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input type="text" id="zip" {...register("zip")} />
          {errors.zip != null && <FormError>{errors.zip.message}</FormError>}
        </div>
        <div>
          <label htmlFor="homePhone">Home Phone</label>
          <input type="text" id="homePhone" {...register("homePhone")} />
          {errors.homePhone != null && (
            <FormError>{errors.homePhone.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="cellPhone">Cell Phone</label>
          <input type="text" id="cellPhone" {...register("cellPhone")} />
          {errors.cellPhone != null && (
            <FormError>{errors.cellPhone.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="workPhone">Work Phone</label>
          <input type="text" id="workPhone" {...register("workPhone")} />
          {errors.workPhone != null && (
            <FormError>{errors.workPhone.message}</FormError>
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
