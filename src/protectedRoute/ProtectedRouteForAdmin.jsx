/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { Navigate } from "react-router";

export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  if (user?.role === "admin") {
    return children;
  } else {
    toast.error("Unable to access");
    return <Navigate to={"/login"} />;
  }
};
