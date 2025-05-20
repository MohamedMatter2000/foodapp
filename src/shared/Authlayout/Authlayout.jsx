import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../src/assets/images/Auth-logo.jpg";
export default function Authlayout() {
  const location = useLocation();
  const register = location.pathname === "/Register" ? "/Register" : "";
  return (
    <div className="auth-container bg-success ">
      <div className="container-fluid bg-overlay">
        <div className="row  min-vh-100 align-items-center justify-content-center">
          <div
            className={`${
              register ? "col-lg-8 col-sm-10" : "col-md-8 col-lg-6 col-11"
            }  bg-white py-3 px-4 rounded-3`}
          >
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="logo" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
