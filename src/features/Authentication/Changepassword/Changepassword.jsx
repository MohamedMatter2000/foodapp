/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loge from "../../../assets/images/Auth-logo.jpg";
import Modal from "react-bootstrap/Modal";
import { getValidationRules } from "../../../hooks/usevalidations";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../../../shared/AuthForm/ReusableForm";
import { FormInput } from "../../../shared/AuthForm/FormInput";
import ButtonForm from "../../../shared/AuthForm/ButtonForm";
import TitleAuth from "../../../shared/AuthForm/TitleAuth";
import { useChangePassword } from "../../../services/apiAuth";
export default function Changepassword({ show, onHide }) {
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
  const { mutate: ChangePassword, isPending } = useChangePassword();
  function onSubmit(data) {
    ChangePassword(data, {
      onSuccess: () => {
        toast.success("Password has been updated successfully");
        onHide();
        navigate("/Login");
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="border-0 pb-2">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img className="w-50 " src={loge} alt="" />
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
            <ButtonForm isSubmitting={isPending}>Submit</ButtonForm>
          </ReusableForm>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
}
