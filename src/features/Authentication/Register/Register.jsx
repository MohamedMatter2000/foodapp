/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { axiosInstances } from "../../../services/Api/ApInstance";
import { USER_URLS } from "../../../services/Api/APiconfig";
import {
  COUNTRY_VAILDTION,
  EMAIL_VAILDTION,
  PASSWORD_VAILDTION,
  PHONE_VAILDTION,
  USER_NAME,
} from "../../../services/validation";
import TitleAuth from "../../../shared/TitleAuth/TitleAuth";
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
    watch,
    trigger,
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [confirmPassword, trigger, password]);
  async function onsubmit(data) {
    setisloading(true);
    console.log(data);
    try {
      const response = await axiosInstances.post(USER_URLS.REGISTER, data);
      toast.success("Succelly");
      navigate("/vertify-account", { state: { email: data.email } });
      console.log(response);
    } catch (errors) {
      console.log(errors);
      toast.error(errors.response.data.message);
    } finally {
      setisloading(false);
    }
  }
  return (
    <>
      <TitleAuth
        heading="Register"
        paragraph="Welcom Back! Please enter Your details"
      />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="container-form d-md-flex gap-md-4 flex-sm-column flex-md-row gap-sm-0">
          <div className="w-100">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control "
                placeholder=" User Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("userName", USER_NAME)}
              />
            </div>
            {errors.userName && (
              <span className="text-da text-danger font-900">
                {errors.userName.message}
              </span>
            )}
            <div className="input-group mb-3">
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
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showpassword ? `password` : `text`}
                className="form-control border-end-0"
                placeholder=" Enter Your password"
                aria-label="password"
                aria-describedby="basic-addon1"
                {...register("password", PASSWORD_VAILDTION)}
              />
              <span
                className="input-group-text fs-4 bg-transparent"
                onClick={handleshowpass}
              >
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-da text-danger font-900">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-100">
            <div className="input-group mb-3">
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
            <div className="input-group mb-3">
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
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <FaLock />
              </span>
              <input
                type={showconfirmpassword ? `password` : `text`}
                className="form-control border-end-0"
                placeholder=" Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-addon1"
                {...register("confirmPassword", {
                  required: "confirmPassword  is required",
                  validate: (value) =>
                    value === watch("password") ||
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
            {errors.confirmPassword && (
              <span className="text-da text-danger font-900">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="links text-end mb-3">
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
