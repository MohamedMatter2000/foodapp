import { Outlet, useLocation } from "react-router-dom";
import loge from "../../../src/assets/images/4 3.jpg";

export default function Authlayout() {
  const location = useLocation();
  console.log(location.pathname);
  const register = location.pathname === "/register" ? "/register" : "";
  return (
    <div>
      <div className="auth-container bg-success ">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 align-items-center justify-content-center">
            <div
              className={`${
                register
                  ? "col-6 col-md-10 col-lg-8 col-10 "
                  : "col-md-8 col-lg-6 col-10 "
              }  bg-white py-3 px-4 rounded-3`}
            >
              <div>
                <div className="logo-container  text-center">
                  <img className="w-50" src={loge} alt="" />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
