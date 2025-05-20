/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
export const FormInput = ({
  name,
  type = "text",
  rules,
  placeholder,
  disabled = false,
}) => {
  function getIcon() {
    switch (name) {
      case "userName":
        return <FaUser />;
      case "email":
        return <FaEnvelope />;
      case "country":
        return <FaEarthAmericas />;
      case "phoneNumber":
        return <FaPhone />;
      case "password":
        return <FaLock />;
      case "confirmPassword":
        return <FaLock />;
      case "seed":
        return <FaIdCard />;
      default:
        return <FaLock />;
    }
  }
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const effectiveType = type === "password" && showPassword ? "text" : type;
  return (
    <div className="mb-3">
      <div className="input-group my-2">
        <span className="input-group-text">{getIcon()}</span>
        <input
          id={name}
          type={effectiveType}
          placeholder={placeholder}
          className={`form-control ${type === "password" && "border-end-0"}`}
          {...register(name, rules)}
          disabled={disabled}
        />
        {type === "password" && (
          <button
            className="input-group-text bg-transparent fs-5 border-start-0"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-danger fw-bolder">{errors[name]?.message}</span>
      )}
    </div>
  );
};
