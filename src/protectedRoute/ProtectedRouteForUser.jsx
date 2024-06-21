/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import toast from "react-hot-toast";

export const ProtectedRouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  if (user?.role === "user") {
    return children;
  } else {
    toast.error("Login with credentials");
    return <Navigate to={"/login"} />;
  }
};
