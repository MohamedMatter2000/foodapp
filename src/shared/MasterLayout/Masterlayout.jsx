/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MainSidebar from "../SIdebar/MainSidebar";
export default function Masterlayout() {
  return (
    <div
      className="d-grid vh-100"
      style={{
        gridTemplateColumns: "min-content 1fr",
      }}
    >
      <div>
        <MainSidebar />
      </div>
      <div className="px-4 overflow-auto ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
