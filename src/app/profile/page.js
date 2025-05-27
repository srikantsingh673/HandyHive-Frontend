"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/profile/`,
          {
            withCredentials: true,
          }
        );
        setProfile(response.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Profile</h2>
      {loading ? (
        <div className="text-muted">Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : profile ? (
        <div className="card shadow-sm p-3">
          <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
}
