"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../css/login.css";
import axios from "axios";

/*
Component to handle user login by password
*/
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.API_BASE_URL}/account/verify-password/`, 
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
       
      });

      if (res.status === 200) {
        console.log("Login successful:", res.data);
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <p className="text-end text-muted">
          <a href="/signinWithOtp" className="text-warning text-decoration-none">
            Login with OTP
          </a>
        </p>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter Email Address" 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">ENTER</button>
        </form>

        <div className="mt-3 text-center">
          <a href="#" className="text-warning text-decoration-none">Forgot password?</a>
        </div>
        <div className="mt-2 text-center text-muted">
          Don't have an account? <a href="/signup" className="text-warning text-decoration-none">Sign up.</a>
        </div>
      </div>
    </div>
  );
}
