"use client";

import { getIndiaState } from "india-state-district";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../css/singup.css";
import axios from "axios";

/*
Component to handle user registration
*/
export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    location: "",
    district: "",
    state: "",
    pincode: "",
    trades: [],
    rate_per_day: "",
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [tradesList, setTradesList] = useState([]);

  useEffect(() => {
    // Fetch all Indian states when component mounts
    const fetchedStates = getIndiaState().sort((a, b) => a.state.localeCompare(b.state));
    setStates(fetchedStates);

    // Fetch available trades
    fetchTrades();

  }, []);


  const fetchTrades = async () => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/account/trades`);
      setTradesList(response.data); // Store trades from API
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate in real-time
    validateField(name, value);
  };

  const handleTradeChange = (tradeId, isChecked) => {
    setFormData((prevFormData) => {
      const updatedTrades = isChecked
        ? [...prevFormData.trades, tradeId] // Add trade if checked
        : prevFormData.trades.filter((id) => id !== tradeId); // Remove if unchecked
  
      return { ...prevFormData, trades: updatedTrades };
    });
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "first_name":
      case "last_name":
        if (!/^[A-Za-z]{2,}$/.test(value)) {
          newErrors[name] = "Only letters, at least 2 characters.";
        } else {
          delete newErrors[name];
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = "Enter a valid email.";
        } else {
          delete newErrors.email;
        }
        break;

      case "mobile":
        if (!/^\d{10}$/.test(value)) {
          newErrors.mobile = "Enter a valid 10-digit mobile number.";
        } else {
          delete newErrors.mobile;
        }
        break;

      case "age":
        if (value < 18 || value > 99) {
          newErrors.age = "Age must be between 18 and 99.";
        } else {
          delete newErrors.age;
        }
        break;

      case "pincode":
        if (!/^\d{6}$/.test(value)) {
          newErrors.pincode = "Enter a valid 6-digit pincode.";
        } else {
          delete newErrors.pincode;
        }
        break;

      case "rate_per_day":
        if (value < 100 || value > 10000) {
          newErrors.rate_per_day = "Rate must be between ₹100 - ₹10,000.";
        } else {
          delete newErrors.rate_per_day;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submitting
    let validationErrors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        validationErrors[field] = errors[field];
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post(`${process.env.API_BASE_URL}/account/workers/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        console.log("success")
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }

    console.log("Form Submitted", formData);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" name="first_name" placeholder="First Name" className="form-control" onChange={handleChange} required />
              {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
            </div>
            <div className="col-md-6">
              <input type="text" name="last_name" placeholder="Last Name" className="form-control" onChange={handleChange} />
              {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
            </div>
          </div>
          <div className="mt-3">
            <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mt-3">
            <input type="password" name="password" placeholder="password" className="form-control" onChange={handleChange} required />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mt-3">
            <input type="tel" name="mobile" placeholder="Mobile Number" className="form-control" pattern="[0-9]*" maxLength="10" onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))} onChange={handleChange} required />
            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
          </div>
          <div className="mt-3">
            <input type="number" name="age" placeholder="Age" className="form-control" onChange={handleChange} required />
            {errors.age && <small className="text-danger">{errors.age}</small>}
          </div>
          <div className="mt-3">
            <select name="gender" className="form-select" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mt-3">
            <input type="text" name="location" placeholder="Location" className="form-control" onChange={handleChange} required />
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <input type="text" name="district" placeholder="District" className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <select name="state" className="form-select bg-white text-dark" onChange={handleChange} required>
                <option value="">Select State</option>
                {states.map((item, index) => (
                  <option key={index} value={item.state}>
                    {item.state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <input type="number" name="pincode" placeholder="Pincode" className="form-control" onChange={handleChange} required />
            {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
          </div>
          <div className="mt-3">
            <label className="form-label">Select Trades</label>
            <div className="d-flex flex-wrap">
              {tradesList.map((trade) => (
                <div key={trade.id} className="form-check me-3">
                  <input
                    type="checkbox"
                    id={`trade-${trade.id}`}
                    className="form-check-input"
                    value={trade.id}
                    checked={formData.trades.includes(trade.id)}
                    onChange={(e) => handleTradeChange(trade.id, e.target.checked)}
                  />
                  <label htmlFor={`trade-${trade.id}`} className="form-check-label">
                    {trade.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <input type="number" name="rate_per_day" placeholder="Rate per Day" className="form-control" onChange={handleChange} required />
            {errors.rate_per_day && <small className="text-danger">{errors.rate_per_day}</small>}
          </div>
          <button type="submit" className="btn btn-warning w-100 mt-4">Sign Up</button>
          <p className="text-center mt-3">
            Already have an account? <Link href="/signin" style={{ color: "#ffc107", textDecoration: "none" }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
