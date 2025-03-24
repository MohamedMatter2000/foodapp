/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import { useState } from "react";
import { axiosInstances } from "../../../services/Api/ApInstance";
import { USER_URLS } from "../../../services/Api/APiconfig";
import {
  EMAIL_VAILDTION,
  PASSWORD_VAILDTION,
} from "../../../services/validation";
import { useFoodApp } from "../../../context/AppFoodProvider";
import TitleAuth from "../../../shared/TitleAuth/TitleAuth";
export default function Login() {
  const { SaveLoginData } = useFoodApp();
  const [showpassword, setshowpassword] = useState(true);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  function handleshowpass() {
    setshowpassword((prev) => !prev);
  }
  async function onsubmit(data) {
    console.log(data);
    try {
      const response = await axiosInstances.post(USER_URLS.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      SaveLoginData();
      toast.success(" Login in Succeclly");
      navigate("/dashboard");
      console.log(response);
    } catch (errors) {
      toast.error(errors?.response?.data?.message);
    }
  }
  return (
    <>
      <TitleAuth heading="Welcom Back! Please enter Your details" />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text  " id="basic-addon1">
            <FaEnvelope />
          </span>
          <input
            type="Email"
            className="form-control "
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
            <FaLock />
          </span>
          <input
            type={showpassword ? `password` : `text`}
            className="form-control border-end-0"
            placeholder="Password"
            aria-label="Password"
            {...register("password", PASSWORD_VAILDTION)}
            aria-describedby="basic-addon1"
          />
          <span
            className="input-group-text fs-4 bg-transparent"
            onClick={handleshowpass}
          >
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <span className="text-da text-danger font-900 ">
            {errors.password.message}
          </span>
        )}
        <div className="links d-flex justify-content-between my-3">
          <Link to="/register" className="text-decoration-none text-black ">
            Register Now?
          </Link>
          <Link
            to="/forget-pass"
            className="text-decoration-none text-success "
          >
            Forget Password?
          </Link>
        </div>
        <button className="btn btn-success w-100" disabled={isSubmitting}>
          {isSubmitting ? <FaSpinner /> : "Log in"}
        </button>
      </form>
    </>
  );
}
