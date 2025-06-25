/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useFoodApp } from "../../context/AppFoodProvider";
import { imageURL } from "../../services/aPiConfig";
import { useCurrentUser } from "../../services/apiUser";
export default function Navbar() {
  const { loginData } = useFoodApp();
  const { userData } = useCurrentUser();
  const imageuser = userData?.imagePath;
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
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      className="images rounded-circle"
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
