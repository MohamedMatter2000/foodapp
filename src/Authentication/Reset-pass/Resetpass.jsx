import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaPhoneVolume,
} from "react-icons/fa";
import { useState } from "react";
import { axiosInstances, USER_URLS } from "../../services/urls/Urls";
import {
  EMAIL_VAILDTION,
  OTP_VAILDTION,
  PASSWORD_VAILDTION,
} from "../../services/urls/validation";
import { useEffect } from "react";
export default function Resetpass() {
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [showpassword, setshowpassword] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  function handleshowpass() {
    setshowpassword((prev) => !prev);
  }
  function handleshowconfirmpass() {
    setshowconfirmpassword((prev) => !prev);
  }
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ defaultValues: { email: state?.email } }, { mode: "onChange" });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [confirmPassword, trigger, password]);

  async function onsubmit(data) {
    console.log(data);
    try {
      const response = await axiosInstances.post(
        USER_URLS.RESET_PASSWORD,
        data
      );
      toast.success(" Reset Password Succeclly");
      navigate("/login");
      console.log(response);
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <>
      <div className="title my-3">
        <h3> Reset Password</h3>
        <p>Please Enter Your Otp or Check Your Inbox</p>
      </div>
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
            {...register("seed", OTP_VAILDTION)}
          />
        </div>
        {errors.seed && (
          <span className="text-da text-danger font-900">
            {errors.seed.message}
          </span>
        )}
        <div className="input-group mb-3 ">
          <span className="input-group-text " id="basic-addon1">
            <FaLock />
          </span>
          <input
            type={showpassword ? `password` : `text`}
            className="form-control border-end-0"
            placeholder=" Password"
            aria-label="Username"
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
        <div className="input-group mb-4">
          <span className="input-group-text " id="basic-addon1">
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

        <button disabled={isSubmitting} className="btn btn-success w-100">
          {isSubmitting ? <FaSpinner /> : "Reset Password"}
        </button>
      </form>
    </>
  );
}
