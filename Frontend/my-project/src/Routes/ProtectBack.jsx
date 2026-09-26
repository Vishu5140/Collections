import { Navigate, Outlet } from "react-router-dom";

function ProtectBack() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectBack;