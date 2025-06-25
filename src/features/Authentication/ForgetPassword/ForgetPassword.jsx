import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { useForgetPassword } from "../../../services/apiAuth";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const { email } = getValidationRules();
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { mutate: ForgetPassword, isPending } = useForgetPassword();
  function onSubmit(data) {
    ForgetPassword(data, {
      onSuccess: () => {
        toast.success("Reset Password Now ");
        navigate("/ResetPassword", { state: { email: data.email } });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
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
          <ButtonForm isSubmitting={isPending}>Submit</ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
