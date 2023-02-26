import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate input fields
    let errors = {};
    if (name.trim() === "") {
      errors.name = "Name is required";
    }
    if (email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    // submit the form if there are no errors
    if (Object.keys(errors).length === 0) {
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.success);
          if (data.success) {
            alert("Registration successful!"); // Show success message
            setRedirect(true);
          } else {
            alert("Registration failed. Email may already in use."); // Show error message
          }
        })
        .catch((error) => console.log(error));
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center pt-28">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold ">Registration</h3>
          </a>
        </div>
        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md ring-2 ring-primary-200 dark:bg-dark-100 sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="undefined block text-sm font-medium "
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm focus:ring
                focus:ring-primary-200 dark:border-b dark:border-b-white
                dark:bg-dark-100 dark:focus:border-0"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="undefined block text-sm font-medium "
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm focus:ring
                focus:ring-primary-200 dark:border-b dark:border-b-white
                dark:bg-dark-100 dark:focus:border-0"
                />

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="undefined block text-sm font-medium "
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm focus:ring
                focus:ring-primary-200 dark:border-b dark:border-b-white
                dark:bg-dark-100 dark:focus:border-0 "
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="undefined block text-sm font-medium"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password_confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-primary-200 dark:border-b dark:border-b-white dark:bg-dark-100 dark:focus:border-0"
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Link to="/login">
                <span className="text-sm  underline hover:text-gray-900">
                  Already registered?
                </span>
              </Link>
              <button
                type="submit"
                onClick={handleSubmit}
                className="false ml-4 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out active:bg-gray-900"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
