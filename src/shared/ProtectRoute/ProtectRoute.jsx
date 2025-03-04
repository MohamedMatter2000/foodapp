/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ logininData, children }) {
  if (localStorage.getItem("token") || logininData) return children;
  else return <Navigate to="/login" />;
}
