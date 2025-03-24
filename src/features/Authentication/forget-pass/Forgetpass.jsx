/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Form, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { axiosInstances } from "../../../services/Api/ApInstance";
import TitleAuth from "../../../shared/TitleAuth/TitleAuth";
export default function Forgetpass() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  async function onsubmit(data) {
    console.log(data);
    try {
      const response = await axiosInstances.post(
        USER_URLS.FORGET_PASSWORD,
        data
      );
      toast.success("Succeclly");
      navigate("/reset-pass", { state: { email: data.email } });
      console.log(response);
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <div>
      <TitleAuth
        heading="Forgot Your Password?"
        paragraph="No worries! Please enter your email and we will send a password reset
          link"
      />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text " id="basic-addon1">
            <FaEnvelope />
          </span>
          <input
            type="Email"
            className="form-control"
            placeholder=" Enter Your Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: " Please Enter vaild Email",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="text-da text-danger font-900">
            {errors.email.message}
          </span>
        )}
        <button className="btn btn-success w-100">
          {isSubmitting ? <FaSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
