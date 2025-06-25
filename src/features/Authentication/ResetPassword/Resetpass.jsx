import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import { useResetPassword } from "../../../services/apiAuth";
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
  const { mutate: ResetPassword, isPending } = useResetPassword();
  function onSubmit(data) {
    ResetPassword(data, {
      onSuccess: () => {
        toast.success("Reset Password Successfully");
        navigate("/Login");
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
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
          <ButtonForm isSubmitting={isPending}>Submit</ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
