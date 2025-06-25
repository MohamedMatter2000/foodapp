import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { useEffect } from "react";
import { useRegister } from "../../../services/apiAuth";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { getValidationRules } from "../../../hooks/usevalidations";
export default function Register() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      country: "",
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
  const { email, password, country, phoneNumber, userName, confirmPassword } =
    getValidationRules(watch);
  const { mutate: registerUser, isPending } = useRegister();
  function onSubmit(data) {
    registerUser(data, {
      onSuccess: () => {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        navigate("/VertifyAccount", { state: { email: data.email } });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Registration failed.");
      },
    });
  }
  return (
    <>
      <TitleAuth
        heading="Register"
        paragraph="Welcom Back! Please enter Your details"
      />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                name="userName"
                rules={userName}
                placeholder="Type userName"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                name="email"
                type="email"
                rules={email}
                placeholder="Type Your Email"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                name="country"
                rules={country}
                placeholder="Type Your country"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                name="phoneNumber"
                type="tel"
                rules={phoneNumber}
                placeholder="Type Your phoneNumber"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                name="password"
                type="password"
                rules={password}
                placeholder="Type Your Password"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                name="confirmPassword"
                type="password"
                rules={confirmPassword}
                placeholder="Type confirmPassword"
              />
            </div>
          </div>
          <div className="text-end">
            <Link
              to="/Login"
              className="text-decoration-none fw-semibold text-success "
            >
              Login Now?
            </Link>
          </div>
          <ButtonForm isSubmitting={isPending}>Register</ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
