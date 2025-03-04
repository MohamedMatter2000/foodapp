/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import loge from "../../../src/assets/images/4 3.jpg";
import { PrivateaxiosInstances, USER_URLS } from "../../services/urls/Urls";
import { PASSWORD_VAILDTION } from "../../services/urls/validation";
export default function Changepass({ closePopup }) {
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [showpassword, setshowpassword] = useState(true);
  const [showoldpassword, setshowoldpassword] = useState(true);
  function handleshowpass() {
    setshowpassword((prev) => !prev);
  }
  function handleshowconfirmpass() {
    setshowconfirmpassword((prev) => !prev);
  }
  function handleshowcoldpass() {
    setshowoldpassword((prev) => !prev);
  }
  const {
    register,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    handleSubmit,
  } = useForm();
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  const navigate = useNavigate();
  async function onsubmit(data) {
    console.log(data);
    try {
      const response = await PrivateaxiosInstances.put(
        USER_URLS.CHANGE_PASSWORD,
        data
      );
      toast.success("Password has been updated successfully");
      navigate("/login");
      console.log(response);
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmNewPassword");
    }
  }, [confirmNewPassword, trigger, newPassword]);
  return (
    <div className="popup-overlay row">
      <div
        className="popup-content  rounded-4 col-6 "
        style={{
          boxShadow:
            " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
        }}
      >
        <div className="bg-white py-5 px-5 rounded-3">
          <div className="logo-container text-center">
            <img className="w-50" src={loge} alt="" />
          </div>
          <div className="title my-3">
            <h3 className="h5">Change Your Password</h3>
            <p>Enter your details below</p>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="input-group mb-3 ">
              <span className="input-group-text " id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showoldpassword ? `password` : `text`}
                className="form-control border-end-0"
                placeholder="Old Password"
                aria-label="Old Password"
                aria-describedby="basic-addon1"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
              />
              <span
                className="input-group-text fs-4 bg-transparent"
                onClick={handleshowcoldpass}
              >
                {showoldpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.oldPassword && (
              <span className="text-da text-danger font-900">
                {errors.oldPassword.message}
              </span>
            )}
            <div className="input-group mb-3 ">
              <span className="input-group-text " id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showpassword ? `password` : `text`}
                className="form-control border-end-0"
                placeholder="newPassword"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("newPassword", PASSWORD_VAILDTION)}
              />
              <span
                className="input-group-text fs-4 bg-transparent"
                onClick={handleshowpass}
              >
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.newPassword && (
              <span className="text-da text-danger font-900">
                {errors.newPassword.message}
              </span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text " id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showconfirmpassword ? `password` : `text`}
                className="form-control border-end-0"
                placeholder=" Confirm New Password"
                aria-label="confirmNewPassword"
                aria-describedby="basic-addon1"
                {...register("confirmNewPassword", {
                  required: "confirmPassword  is required",
                  validate: (value) =>
                    value === watch("newPassword") ||
                    " should password match confirm password",
                })}
              />
              <span
                className="input-group-text fs-4 bg-transparent"
                onClick={handleshowconfirmpass}
              >
                {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmNewPassword && (
              <span className="text-da text-danger font-900">
                {errors.confirmNewPassword.message}
              </span>
            )}
            <button disabled={isSubmitting} className="btn btn-success w-100 ">
              {isSubmitting ? <FaSpinner /> : "Change Password"}
            </button>
            <span
              className="d-block btn  bg-secondary-subtle text-black border-0 mt-3"
              onClick={closePopup}
            >
              Cancel
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
