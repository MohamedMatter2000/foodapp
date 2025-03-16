/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ import React from "react";
import avatar from "../../assets/images/avatar.png";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown, FaBell } from "react-icons/fa";
import { useFoodApp } from "../../context/AppFoodProvider";
export default function Navbar({ logininData }) {
  return (
    <div className="pt-1 pb-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex  align-items-center justify-content-between pe-4"
            id="navbarSupportedContent"
          >
            <div className="search w-50 d-flex align-items-center justify-content-center">
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
            </div>
            <ul className="navbar-nav   d-flex flex-row gap-4 align-items-center">
              <ul className="d-flex">
                <li className="nav-item">
                  <img src={avatar} />
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    {logininData?.userEmail}
                  </a>
                </li>
              </ul>
              <li className="nav-item fs-5">
                <FaChevronDown />
              </li>
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

// const Navbar = ({ loginData }) => {
//   console.log(loginData);

//   return (
//     <div className="pt-1 pb-3">
//       <nav className="navbar navbar-expand-sm bg-body-tertiary rounded-4">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto  align-items-center gap-2">
//               <span className="rounded-circle overflow-auto ">
//                 <img className="w-100" src={avatar} alt="avatar" />
//               </span>
//               <li className="nav-item  ">
//                 <a
//                   className="nav-link active fw-semibold flex bg-body-tertiary"
//                   aria-current="page"
//                 >
//                   {loginData?.userEmail ?? "username"}{" "}
//                   <i className="fa fa-angle-down ms-5"></i>
//                 </a>
//               </li>
//             </ul>
//             <div className="ms-3 position-relative">
//               <i className="fa-solid fa-bell"></i>
//               <span className="bill-notification"></span>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };
