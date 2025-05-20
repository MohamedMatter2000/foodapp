import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { axiosInstances } from "../../../services/Api/ApInstance";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
export default function Vertify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, OTP } = getValidationRules();
  const methods = useForm({
    defaultValues: {
      email: state?.email,
      seed: "",
    },
  });
  async function onSubmit(data) {
    try {
      await axiosInstances.put(USER_URLS.VERIFY_ACCOUNT, data);
      toast.success("Vertify Account Successfully");
      navigate("/Login");
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  }
  return (
    <>
      <TitleAuth
        heading="Vertify Account"
        paragraph="Please enter Your OTP or check your inbox"
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
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Submit
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
