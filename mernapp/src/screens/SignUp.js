import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        toast.success("🎉 SignUp Successful!", { autoClose: 1500 });

        localStorage.setItem("token", json.authToken);

        // delay navigation so toast is visible
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("❌ Enter Valid Credentials!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        autoClose: 2000,
      });
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
        <div>
          <Navbar />
        </div>

        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={handleChange}
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
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="geolocation"
                value={credentials.geolocation}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
