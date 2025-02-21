'use client';

import { useEffect, useState } from "react";
import axios from "axios";

/*
Component to display a list of available workers
*/
export default function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.API_BASE_URL}/account/workers/`)
      .then((response) => {
        setWorkers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading helpers...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Helpers</h2>
      <div className="row">
        {workers.map((worker) => (
          <div key={worker.worker_id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {worker.first_name} {worker.last_name}
                </h5>
                <p className="card-text mb-1">
                  <strong>Location:</strong> {worker.location}, {worker.state}
                </p>
                <p className="card-text mb-1">
                  <strong>Phone:</strong> {worker.mobile}
                </p>
                <p className="card-text mb-1">
                  <strong>Rate per day:</strong> ₹{worker.rate_per_day}
                </p>
                <p className="card-text mb-1">
                  <strong>Gender:</strong> {worker.gender}
                </p>
                <p className="card-text mb-1">
                  <strong>Status:</strong> {worker.status}
                </p>
                <p className="card-text">
                  <strong>Trades:</strong>{" "}
                  {worker.trades.length > 0
                    ? worker.trades.map((trade) => trade.name).join(", ")
                    : "No trade listed"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
