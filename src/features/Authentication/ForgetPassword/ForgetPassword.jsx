import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { axiosInstances } from "../../../services/Api/ApInstance";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const { email } = getValidationRules();
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data) {
    try {
      await axiosInstances.post(USER_URLS.FORGET_PASSWORD, data);
      toast.success("Reset Password Now ");
      navigate("/ResetPassword", { state: { email: data.email } });
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <>
      <TitleAuth
        heading="Forgot Your Password?"
        paragraph="No worries! Please enter your email and we will send a password reset
          link"
      />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <Link
            to="/"
            className="text-decoration-none text-success  fw-semibold "
          >
            Login Now ?
          </Link>
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Submit
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
