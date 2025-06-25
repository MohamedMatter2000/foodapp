/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { imageURL } from "../../services/aPiConfig";
import { useEffect } from "react";
import { useCurrentUser, useUpdateCurrentUser } from "../../services/apiUser";
import { pathToFileObject } from "../../utils/helpers";
import ButtonForm from "../../shared/AuthForm/ButtonForm";
import ReusableForm from "../../shared/AuthForm/ReusableForm";
import { getValidationRules } from "../../hooks/usevalidations";
import { FormInput } from "../../shared/AuthForm/FormInput";
import Spinner from "../../shared/NoDate/Spinner";
import { useFoodApp } from "../../context/AppFoodProvider";
export default function Profile() {
  const { userData, isPending, isSuccess } = useCurrentUser();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { Updateuser, isUpdating } = useUpdateCurrentUser();
  const { email, password, country, phoneNumber, userName } =
    getValidationRules();
  const methods = useForm({
    defaultValues: {
      userName: "",
      email: "",
      country: "",
      phoneNumber: "",
      profileImage: null,
      confirmPassword: "",
    },
  });
  const { trigger, watch, register, setValue } = methods;
  const watchedImage = watch("profileImage");
  function onsubmit(data) {
    const formData = new FormData();
    for (let key in data) {
      if (key === "profileImage") {
        if (data[key] && data[key].length > 0) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    Updateuser(formData, {
      onSuccess: () => {
        toast.success("Update successfully");
        setValue("confirmPassword", "");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "An unexpected error occurred."
        );
      },
    });
  }
  useEffect(() => {
    if (
      watchedImage &&
      watchedImage.length > 0 &&
      watchedImage[0] instanceof File
    ) {
      const newPreviewUrl = URL.createObjectURL(watchedImage[0]);
      setImagePreview(newPreviewUrl);
      return () => URL.revokeObjectURL(newPreviewUrl);
    } else if (isSuccess && userData) {
      setValue("userName", userData.userName);
      setValue("email", userData.email);
      setValue("country", userData.country);
      setValue("phoneNumber", userData.phoneNumber);
      if (userData.imagePath) {
        setImagePreview(`${imageURL}${userData.imagePath}`);
        const setInitialImage = async () => {
          const file = await pathToFileObject(userData.imagePath);
          if (file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            setValue("profileImage", dataTransfer.files);
          }
        };
        setInitialImage();
      } else {
        setImagePreview(null);
      }
    }
  }, [isSuccess, userData, setValue, watchedImage]);

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <FormProvider {...methods}>
          <ReusableForm onSubmit={methods.handleSubmit(onsubmit)}>
            <div>
              <label htmlFor="profileImage" className="form-label py-3 w-100  ">
                <div className="d-flex align-items-center justify-content-center flex-column w-100">
                  <input
                    {...register("profileImage")}
                    type="file"
                    className="form-control d-none"
                    id="profileImage"
                    accept="image/*"
                  />
                  {imagePreview ? (
                    <img
                      className="images rounded-circle"
                      src={imagePreview}
                      alt="Profile Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "2px solid #ddd",
                      }}
                    />
                  ) : (
                    <FaUser
                      style={{
                        marginTop: "9px",
                        fontSize: "50px",
                        color: "#6c757d",
                      }}
                    />
                  )}
                  <small className="text-muted mt-2">
                    Click to change photo
                  </small>
                </div>
              </label>
              {methods.formState.errors.profileImage && (
                <div className="text-danger">
                  {methods.formState.errors.profileImage.message}
                </div>
              )}
            </div>
            <FormInput
              name="userName"
              rules={userName}
              placeholder="Type userName"
            />
            <FormInput
              name="country"
              rules={country}
              placeholder="Type Your country"
            />
            <FormInput
              name="phoneNumber"
              type="tel"
              rules={phoneNumber}
              placeholder="Type Your phoneNumber"
            />
            <FormInput
              name="email"
              rules={email}
              placeholder="Type Your Email"
              type="email"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              rules={password}
              placeholder="Type Your Password"
            />
            <ButtonForm isSubmitting={isUpdating} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </ButtonForm>
          </ReusableForm>
        </FormProvider>
      )}
    </>
  );
}
// useEffect(() => {
//   if (isSuccess) {
//     setValue("userName", userData?.userName);
//     setValue("email", userData?.email);
//     setValue("country", userData?.country);
//     setValue("phoneNumber", userData?.phoneNumber);
//     if (userData.imagePath) {
//       (async () => {
//         const file = await pathToFileObject(userData.imagePath);
//         if (file) {
//           setValue("profileImage", [file]);
//         }
//       })();
//     }
//   }
// }, [isSuccess, userData, setValue]);
{
  /* {imageuser ? (
                  <img
                    className="images rounded-2"
                    src={`${imageURL + imageuser}`}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaUser style={{ marginTop: "9px", fontSize: "50px" }} />
                )} */
}
// const {
//   register,
//   formState: { errors },
//   setValue,
//   handleSubmit,
// } = useForm({ mode: "onChange" });
{
  /* <form onSubmit={handleSubmit(onsubmit)}>
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
                  {...register("userName")}
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
                  {...register("country")}
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
                    {...register("email")}
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
                    {...register("phoneNumber")}
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
                  {...register("confirmPassword")}
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
          {isPending ? <FaSpinner /> : "Update"}
        </button>
      </form> */
}
