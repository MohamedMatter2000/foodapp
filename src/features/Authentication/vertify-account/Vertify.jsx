/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { axiosInstances } from "../../../services/Api/ApInstance";
import { EMAIL_VAILDTION, OTP_VAILDTION } from "../../../services/validation";
import TitleAuth from "../../../shared/TitleAuth/TitleAuth";

export default function Vertify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues: { email: state?.email } }, { mode: "onChange" });
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
      <TitleAuth
        heading="Vertify Account"
        paragraph="Please enter Your OTP or check your inbox"
      />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <FaEnvelope />
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
          <span className="input-group-text " id="basic-addon1">
            <FaPhoneVolume />
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
