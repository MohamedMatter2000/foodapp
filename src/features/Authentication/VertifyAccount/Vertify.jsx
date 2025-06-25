import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hooks/usevalidations";
import { useVerifyAccount } from "../../../services/apiAuth";
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
  const { mutate: VerifyAccount, isPending } = useVerifyAccount();
  function onSubmit(data) {
    VerifyAccount(data, {
      onSuccess: () => {
        toast.success("Vertify Account Successfully");
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
          <ButtonForm isSubmitting={isPending}>Submit</ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
