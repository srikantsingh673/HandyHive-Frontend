"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

/*
Component to display the top navbar
*/
export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Check if refreshToken & accessToken exist in cookies
    const refreshToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

console.log("Access Token:", accessToken);
  console.log("Is Authenticated:", !!refreshToken && !!accessToken);

    setIsAuthenticated(!!refreshToken && !!accessToken); // Set true if both exist
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="me-2"
          />
          HandyHive
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item signin">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/signin"
                  >
                    Sign in
                  </a>
                </li>
                <li className="nav-item signup">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/signup"
                  >
                    Sign up
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item profile">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item logout">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#" onClick={() => {
                        Cookies.remove('accessToken');
                        Cookies.remove('refreshToken');
                        setIsAuthenticated(false);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Suggestions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
