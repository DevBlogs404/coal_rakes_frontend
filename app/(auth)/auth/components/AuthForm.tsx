"use client";

import useAuth from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, loginValidation } from "@/utils/validationScehma";
import { formSchema, loginSchema } from "@/types/types";

export default function AuthForm({ isSignIn }: { isSignIn: boolean }) {
  const { signUp, logIn } = useAuth();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<formSchema>({
    resolver: zodResolver(isSignIn ? loginValidation : validationSchema),
  });

  const onSubmit: SubmitHandler<formSchema> = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    role,
  }) => {
    if (isSignIn) {
      logIn({ email, password });
    } else {
      signUp({ firstName, lastName, email, password, phone, role });
    }
  };

  return (
    <form
      className="max-w-screen-md flex flex-col gap-4 border-2 p-4 rounded-lg border-black "
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSignIn ? null : (
        <>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="border-2 p-2 rounded-sm outline-none"
          />
          {errors.firstName && (
            <div className="text-red-800">{errors.firstName?.message}</div>
          )}
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="border-2 p-2 rounded-sm outline-none"
          />
          {errors.lastName && (
            <div className="text-red-800">{errors.lastName?.message}</div>
          )}
        </>
      )}
      <input
        type="email"
        placeholder="E-mail"
        {...register("email")}
        className="border-2 p-2 rounded-sm outline-none"
      />
      {errors.email && (
        <div className="text-red-800">{errors.email?.message}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border-2 p-2 rounded-sm outline-none"
      />
      {errors.password && (
        <div className="text-red-800">{errors.password?.message}</div>
      )}

      {isSignIn ? null : (
        <>
          <input
            type="password"
            placeholder="confirmPassword"
            {...register("confirmPassword")}
            className="border-2 p-2 rounded-sm outline-none"
          />
          {errors.confirmPassword && (
            <div className="text-red-800">
              {errors.confirmPassword?.message}
            </div>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="border-2 p-2 rounded-sm outline-none"
          />
          {errors.phone && (
            <div className="text-red-800">{errors.phone?.message}</div>
          )}
          <select
            id="role"
            defaultValue="admin"
            {...register("role")}
            className="border-2 p-2 rounded-sm outline-none"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && (
            <div className="text-red-800">{errors.role?.message}</div>
          )}
        </>
      )}

      <Button type="submit">{isSignIn ? "Log In" : "Sign Up"}</Button>
    </form>
  );
}
