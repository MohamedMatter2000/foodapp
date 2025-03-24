/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useFoodApp } from "../../context/AppFoodProvider";

export default function ProtectRoute({ children }) {
  const { loginData } = useFoodApp();
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
}
