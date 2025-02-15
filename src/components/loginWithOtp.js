"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/login.css";
import axios from "axios";

export default function OTPLoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send-otp`, { email });
      setOtpSent(true);
      setLoading(false);
      console.log("OTP sent to:", email);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-otp`, { email, otp });
      console.log("OTP Verified", response.data);
      setLoading(false);
    } catch (err) {
      setError("Invalid OTP. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login with OTP</h2>

        <form onSubmit={handleVerifyOTP} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
            {error && <p className="text-danger text-end">{error}</p>}
          </div>

          {!otpSent ? (
            <button type="button" className="btn btn-warning w-100" onClick={handleSendOTP} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <div className="mb-3 mt-3">
                <label className="form-label">Enter OTP</label>
                <input 
                  type="text" 
                  className="form-control text-center" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} 
                  placeholder="Enter OTP" 
                  maxLength="6"
                  required 
                />
              </div>
              <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </form>

        <div className="mt-3 text-center text-muted">
          <a href="/signin" className="text-warning text-decoration-none">Login with Password</a>
        </div>
      </div>
    </div>
  );
}
