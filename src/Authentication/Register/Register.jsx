/* eslint-disable no-unused-vars */
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loge from "../../../src/assets/images/4 3.jpg";
import { toast } from "react-toastify";
import {
  FaLock,
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaPhone,
} from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { useState } from "react";
import { axiosInstances, USER_URLS } from "../../services/urls/Urls";
import {
  COUNTRY_VAILDTION,
  EMAIL_VAILDTION,
  PASSWORD_VAILDTION,
  PHONE_VAILDTION,
} from "../../services/urls/validation";
export default function Register() {
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [showpassword, setshowpassword] = useState(true);
  const [isLoading, setisloading] = useState(false);
  const navigate = useNavigate();
  function handleshowpass() {
    setshowpassword((prev) => !prev);
  }
  function handleshowconfirmpass() {
    setshowconfirmpassword((prev) => !prev);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  console.log(getValues());
  async function onsubmit(data) {
    setisloading(true);
    console.log(data);
    try {
      const response = await axiosInstances.post(USER_URLS.REGISTER, data);
      toast.success("Succelly");
      navigate("/vertify-account");
      console.log(response);
    } catch (errors) {
      console.log(errors);
      toast.error(errors.response.data.additionalInfo.errors[0]);
    } finally {
      setisloading(false);
    }
  }
  return (
    <>
      <div className="title my-3">
        <h3 className="h5">Register</h3>
        <p>Welcom Back! Please enter Your details</p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="container-form d-flex justify-content-between">
          <div>
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder=" User Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("userName", {
                  required: "userName is required",
                })}
              />
            </div>
            {errors.userName && (
              <span className="text-da text-danger font-900">
                {errors.userName.message}
              </span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaEarthAmericas />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="country"
                aria-label="Country"
                aria-describedby="basic-addon1"
                {...register("country", COUNTRY_VAILDTION)}
              />
            </div>
            {errors.country && (
              <span className="text-da text-danger font-900">
                {errors.country.message}
              </span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showpassword ? `password` : `text`}
                className="form-control"
                placeholder=" Enter Your password"
                aria-label="password"
                aria-describedby="basic-addon1"
                {...register("password", PASSWORD_VAILDTION)}
              />
              <span className="input-group-text" onClick={handleshowpass}>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-da text-danger font-900">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaEnvelope />
              </span>
              <input
                type="Email"
                className="form-control"
                placeholder=" Enter Your Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("email", EMAIL_VAILDTION)}
              />
            </div>
            {errors.email && (
              <span className="text-da text-danger font-900">
                {errors.email.message}
              </span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaPhone />
              </span>
              <input
                type="phone"
                className="form-control"
                placeholder="Enter Phone"
                aria-label="Country"
                aria-describedby="basic-addon1"
                {...register("phoneNumber", PHONE_VAILDTION)}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-da text-danger font-900">
                {errors.phoneNumber.message}
              </span>
            )}
            <div className="input-group mb-4">
              <span className="input-group-text" id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showconfirmpassword ? `password` : `text`}
                className="form-control"
                placeholder=" Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-addon1"
                {...register("confirmPassword", {
                  required: "confirmPassword  is required",
                  validate: (value) =>
                    value === getValues().password ||
                    " should password match confirm password",
                })}
              />
              <span
                className="input-group-text"
                onClick={handleshowconfirmpass}
              >
                {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-da text-danger font-900">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="links text-end my-3">
          <Link to="/login" className="text-decoration-none text-success ">
            Log in Now ?
          </Link>
        </div>
        <button className="btn btn-success w-75 d-block text-center my-2 mx-auto">
          {isLoading ? <FaSpinner /> : "Register"}
        </button>
      </form>
    </>
  );
}
