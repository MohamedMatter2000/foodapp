/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { imageURL, USER_URLS } from "../../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../../services/Api/ApInstance";
import {
  COUNTRY_VAILDTION,
  EMAIL_VAILDTION,
  PASSWORD_VAILDTION,
  PHONE_VAILDTION,
  USER_NAME,
} from "../../services/validation";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaPhone,
} from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { useEffect } from "react";
import { useFoodApp } from "../../context/AppFoodProvider";
import TitleAuth from "../../shared/TitleAuth/TitleAuth";
export default function Profile() {
  const { imageuser, setImageuser, getCurrentUser, currentUser } = useFoodApp();
  const [showpassword, setshowpassword] = useState(true);
  const navigate = useNavigate();

  function handleshowpass() {
    setshowpassword((prev) => !prev);
  }
  // function logeout() {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // }
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const pathToFileObject = async (imagePath) => {
    try {
      const fullImageUrl = `${imageURL}${imagePath}`;
      setImageuser(imagePath);
      const response = await fetch(fullImageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const fileName = imagePath;
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error converting path to File object:", error);
      return null;
    }
  };
  async function onsubmit(data) {
    const formData = new FormData();
    for (let key in data) {
      if (key === "profileImage") {
        formData.append(key, data?.[key]?.[0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    console.log(data);
    try {
      const response = await PrivateaxiosInstances.put(
        USER_URLS.UPADTE_CURRENT_USER,
        formData
      );
      await getCurrentUser();
      // logeout();
      toast.success("Update successlly");
      console.log(response.data);
    } catch (errors) {
      toast.error("failed update check password");
      console.log(errors);
    }
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setValue("userName", currentUser?.userName);
      setValue("email", currentUser?.email);
      setValue("country", currentUser?.country);
      setValue("phoneNumber", currentUser?.phoneNumber);
      if (currentUser?.imagePath) {
        (async () => {
          try {
            const fullImageUrl = `${imageURL}${currentUser?.imagePath}`;
            setImageuser(currentUser?.imagePath);
            const response = await fetch(fullImageUrl);
            if (!response.ok) throw new Error("Failed to fetch image");
            const blob = await response.blob();
            const fileName = currentUser?.imagePath;
            const file = new File([blob], fileName, { type: blob.type });
            if (file) {
              setValue("profileImage", [file]);
            }
            return file;
          } catch (error) {
            console.error("Error converting path to File object:", error);
            return null;
          }
        })();
      }
    }
  }, [currentUser, setValue, imageuser, setImageuser]);
  return (
    <>
      <TitleAuth
        heading="Update"
        paragraph="Welcom Back! Please enter Your details"
      />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="container-form d-flex flex-column  gap-4">
          <div>
            <label htmlFor="profileImage" className="form-label py-3 w-100  ">
              <div className="d-flex align-items-center justify-content-center flex-column w-100">
                <input
                  {...register("profileImage")}
                  type="file"
                  className="form-control d-none"
                  id="profileImage"
                />
                {imageuser ? (
                  <img className="images" src={`${imageURL + imageuser}`} />
                ) : (
                  <FaUser style={{ marginTop: "9px" }} />
                )}
              </div>
            </label>
            {errors.profileImage && (
              <div className="text-danger">{errors.profileImage.message}</div>
            )}
          </div>
          <div className="d-flex gap-sm-0 gap-4 flex-row ">
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
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaLock />
                </span>
                <input
                  type={showpassword ? `password` : `text`}
                  className="form-control border-end-0"
                  placeholder=" Enter Your password"
                  aria-label="confirmPassword"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", PASSWORD_VAILDTION)}
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
          </div>
        </div>
        <div className="links text-end mb-3"></div>
        <button className="btn btn-success w-75 d-block text-center my-2 mx-auto">
          {isSubmitting ? <FaSpinner /> : "Update"}
        </button>
      </form>
    </>
  );
}
