import UilEye from "@iconscout/react-unicons/icons/uil-eye";
import Eye from "@iconscout/react-unicons/icons/uil-eye-slash";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  async function login(ev) {
    ev.preventDefault();
    setErrors({}); // clear any previous errors
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    }
    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Wrong credentials",
      }));
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white dark:bg-dark-200">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-2xl ring-2 ring-primary-200 dark:bg-dark-100 dark:text-white lg:max-w-xl">
        <h1 className="text-center text-3xl font-semibold uppercase text-primary-200 underline decoration-wavy">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={login}>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-primary-200 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-40"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                type={showPassword ? "text" : "password"}
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-primary-200 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-40"
              />
              <span
                className="text-primary-400 absolute right-0 top-0 mt-1 mr-2 text-sm hover:text-primary-200 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye color="black" />
                ) : (
                  <UilEye color="black" />
                )}
              </span>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <a href="#s" className="text-xs hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full transform rounded-md bg-dark-400 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-dark-300 focus:bg-dark-200 focus:outline-none">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xl font-light ">
          Don't have an account?{" "}
          <Link to="/registration">
            <span className="font-bold hover:underline dark:text-white">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
