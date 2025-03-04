/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loge from "../../../src/assets/images/4 3.jpg";
import { axiosInstances, USER_URLS } from "../../services/urls/Urls";
import { EMAIL_VAILDTION, OTP_VAILDTION } from "../../services/urls/validation";

export default function Vertify() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  async function onsubmit(data) {
    console.log(data);
    try {
      const response = await axiosInstances.put(USER_URLS.VERIFY_ACCOUNT, data);
      toast.success("Succeclly");
      navigate("/login");
      console.log(response);
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }

  return (
    <>
      <div className="title my-3">
        <h3>Vertify Account</h3>
        <p> Please enter Your OTP or check your inbox</p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="Email"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
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
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder=" OTP"
            aria-label="OTP"
            aria-describedby="basic-addon1"
            {...register("code", OTP_VAILDTION)}
          />
        </div>
        {errors.email && (
          <span className="text-da text-danger font-900">
            {errors.email.message}
          </span>
        )}
        <button className="btn btn-success w-100">
          {isSubmitting ? <FaSpinner /> : "Send "}
        </button>
      </form>
    </>
  );
}
