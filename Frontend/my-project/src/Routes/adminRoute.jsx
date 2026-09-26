import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const role = localStorage.getItem("role");
  const token=localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace  />;
  }
  else if (role !== "admin") {
    return <Navigate to="*"  replace/>;
  }

 else
  return <Outlet />;
}

export default AdminRoute;