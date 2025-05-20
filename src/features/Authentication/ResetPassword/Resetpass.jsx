import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { axiosInstances } from "../../../services/Api/ApInstance";
import { USER_URLS } from "../../../services/Api/APiconfig";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const methods = useForm({
    defaultValues: {
      email: state?.email,
      seed: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { trigger, watch } = methods;
  const NewPassword = watch("password");
  const confirmNewPassword = watch("confirmPassword");
  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmPassword");
    }
  }, [confirmNewPassword, trigger, NewPassword]);
  const { email, password, confirmPassword, OTP } = getValidationRules(watch);

  async function onSubmit(data) {
    try {
      await axiosInstances.post(USER_URLS.RESET_PASSWORD, data);
      toast.success("Reset Password Successfully");
      navigate("/Login");
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <>
      <TitleAuth
        heading="Reset Password"
        paragraph="Please Enter Your Otp or Check Your Inbox"
      />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
            disabled
          />
          <FormInput name="seed" rules={OTP} placeholder="Type OTP" />
          <FormInput
            name="password"
            rules={password}
            placeholder="Type Your New Password"
            type="password"
          />
          <FormInput
            name="confirmPassword"
            rules={confirmPassword}
            placeholder="Confirm New Password"
            type="password"
          />
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Submit
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
