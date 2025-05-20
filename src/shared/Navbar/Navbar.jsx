/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useFoodApp } from "../../context/AppFoodProvider";
import { imageURL } from "../../services/Api/APiconfig";
export default function Navbar() {
  const { loginData, imageuser } = useFoodApp();
  return (
    <div className="pt-1 pb-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex justify-content-start justify-content-sm-end align-items-center pe-4"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav d-flex flex-row gap-4 align-items-center">
              <ul className="d-flex p-0">
                <li className="nav-item">
                  {imageuser ? (
                    <img
                      src={`${imageURL + imageuser}`}
                      style={{ maxWidth: 30 }}
                      className="rounded "
                    />
                  ) : (
                    <FaUser className="mt-2" />
                  )}
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    {loginData?.userEmail}
                  </a>
                </li>
              </ul>
              <li className="nav-item position-relative Bell fs-5">
                <FaBell />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
