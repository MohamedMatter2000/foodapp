/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loge from "../../../assets/images/Auth-logo.jpg";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import { getValidationRules } from "../../../hooks/usevalidations";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
export default function Changepassword() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const { trigger, watch } = methods;
  const NewPassword = watch("newPassword");
  const confirmPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmNewPassword");
    }
  }, [confirmPassword, trigger, NewPassword]);
  const { password, confirmNewPassword } = getValidationRules(watch);

  async function onSubmit(data) {
    try {
      await PrivateaxiosInstances.put(USER_URLS.CHANGE_PASSWORD, data);
      toast.success("Password has been updated successfully");
      navigate("/Login");
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <div className="popup-overlay row">
      <div className="popup-content rounded-4 col-md-8 col-lg-6 col-11">
        <div className="bg-white  py-3 px-4 rounded-3 ">
          <div className="logo-container text-center">
            <img className="w-50" src={loge} alt="" />
          </div>
          <TitleAuth
            heading={"Change Your Password"}
            paragraph={"Enter your details below"}
          />
          <FormProvider {...methods}>
            <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
              <FormInput
                name="oldPassword"
                rules={password}
                placeholder="Type Your oldPassword"
                type="password"
              />
              <FormInput
                name="newPassword"
                rules={password}
                placeholder="Type Your New Password"
                type="password"
              />
              <FormInput
                name="confirmNewPassword"
                rules={confirmNewPassword}
                placeholder="Confirm New Password"
                type="password"
              />
              <ButtonForm isSubmitting={methods.formState.isSubmitting}>
                Submit
              </ButtonForm>
            </ReusableForm>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
