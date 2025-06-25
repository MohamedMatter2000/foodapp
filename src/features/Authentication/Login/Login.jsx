import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { useFoodApp } from "../../../context/AppFoodProvider";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { useLogin } from "../../../services/apiAuth";
export default function Login() {
  const { SaveLoginData } = useFoodApp();
  const { email, password } = getValidationRules();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: loginUser, isPending } = useLogin();
  function onSubmit(data) {
    loginUser(data, {
      onSuccess: (data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        SaveLoginData();
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      },
    });
  }
  return (
    <>
      <TitleAuth heading="Welcom Back! Please enter Your details" />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <FormInput
            name="password"
            type="password"
            rules={password}
            placeholder="Type Your Password"
          />
          <div className="d-flex justify-content-between ">
            <Link
              to="/Register"
              className="text-decoration-none  fw-semibold text-black "
            >
              Register Now?
            </Link>
            <Link
              to="/ForgetPassword"
              className="text-decoration-none fw-semibold text-success "
            >
              Forget Password?
            </Link>
          </div>
          <ButtonForm isSubmitting={isPending} disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
