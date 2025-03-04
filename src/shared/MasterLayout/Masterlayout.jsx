/* eslint-disable react/prop-types */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Changepass from "../../Authentication/change-pass/Changepass";
import Navbar from "../Navbar/Navbar";
import MainSidebar from "../SIdebar/MainSidebar";

export default function Masterlayout({ logininData }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 1fr",
          gridTemplateRows: "0fr 1fr",
          height: "100vh",
        }}
      >
        <div className="">
          <MainSidebar setIsPopupVisible={setIsPopupVisible} />
        </div>
        <div
          style={{
            padding: " 0 2rem",
            overflow: "scroll",
          }}
        >
          <Navbar logininData={logininData} />
          <Outlet />
          {isPopupVisible && <Changepass closePopup={closePopup} />}
        </div>
      </div>
    </div>
  );
}
