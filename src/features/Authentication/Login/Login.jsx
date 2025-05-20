import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { axiosInstances } from "../../../services/Api/ApInstance";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { useFoodApp } from "../../../context/AppFoodProvider";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
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
  async function onSubmit(data) {
    try {
      const response = await axiosInstances.post(USER_URLS.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      SaveLoginData();
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (errors) {
      toast.error(errors?.response?.data?.message);
    }
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
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Login
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
