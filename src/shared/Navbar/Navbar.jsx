/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaUser, FaUserAlt } from "react-icons/fa";
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
            {/* <div className="search w-50 d-flex align-items-center justify-content-center">
              <div
                className=" position-relative fs-5  "
                style={{ left: "40px", marginTop: "-4px" }}
              >
                <CiSearch />
              </div>
              <input
                type="search"
                placeholder="Search bar"
                className="w-100  ps-5 py-2 rounded-4"
              />
            </div> */}
            <ul className="navbar-nav   d-flex  flex-row gap-4 align-items-center">
              <ul className="d-flex p-0">
                <li className="nav-item">
                  {imageuser ? (
                    <img
                      src={`${imageURL + imageuser}`}
                      style={{ maxWidth: 30 }}
                    />
                  ) : (
                    <FaUser style={{ marginTop: "9px" }} />
                  )}
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    {loginData?.userEmail}
                  </a>
                </li>
              </ul>
              {/* <li className="nav-item fs-5 dropup-center dropup">
                <div className="dropdown w-auto h-100">
                  <span data-bs-toggle="dropdown" aria-expanded="false">
                    <FaChevronDown />
                  </span>
                  <div
                    className="dropdown-menu user "
                    style={{ bottom: "-105px", left: "-7px" }}
                  >
                    <div className="dropdown-item text-light ">
                      <CgProfile className="mb-1 me-2 fs-5" />
                      Profile
                    </div>
                    <div className="dropdown-item text-light">
                      <CgPassword className="mb-1 me-2 fs-5" />
                      ChangePasword
                    </div>
                    <div className="dropdown-item text-light ">
                      <CgLogOut className="mb-1 me-2 fs-5" />
                      Logeout
                    </div>
                  </div>
                </div>
              </li> */}
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
