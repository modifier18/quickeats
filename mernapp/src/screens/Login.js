import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        toast.error("Please check your credentials");
        return;
      }

      // Success case
      toast.success("Login Successful 🎉", { autoClose: 1500 });
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);

      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Navbar />

        <div className="container mt-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/signup" className="m-3 btn btn-danger">
              New User
            </Link>
          </form>
          <ToastContainer position="top-center" />
        </div>
      </div>
    </>
  );
}
