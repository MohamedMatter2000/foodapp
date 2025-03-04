import { Outlet } from "react-router-dom";
import loge from "../../../src/assets/images/4 3.jpg";
export default function Authlayout() {
  return (
    <div>
      <div className="auth-container bg-success ">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className=" col-md-5 bg-white py-3 px-4 rounded-3 ">
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
