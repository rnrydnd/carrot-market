import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

// Less code
// Bettter validation
// Better Errors(set, clear, display)
// Have control over input - custom
// Dont deal with events
// Easier Inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    resetField
  } = useForm<LoginForm>({
    mode: "onBlur", // 해당 input에 point되어있다가 나올때 발생(가장 유용할듯?, default는 submit임)
    defaultValues: {
      username: "11",
    },
  });
  const onValid = (data: LoginForm) => {
    console.log("im valid", data);
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input {...register('username', {
        required: 'Username is required',
        minLength: {
          message: 'Username is shoould be longer than 5 chars',
          value: 5,
        },

      })} type="text" placeholder="Username" />
      {errors.username?.message}
      <input {...register('email', {
        required: 'Email is required',
        validate: {
          notGamil: (value) => !value.includes('@gmail.com') || 'Gmail is not allowed'
        }
      })} type="email" placeholder="Email"
        className={`${Boolean(errors.email) && 'border-red-500 border-2'}`}
      />
      {errors.email?.message}
      <input {...register('password', {
        required: 'Password is required'
      })} type="password" placeholder="Password" />
      <input type="submit" value="Create Account" />
    </form>
  )
}