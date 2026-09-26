import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const role = localStorage.getItem("role");
  const token=localStorage.getItem("token");
  if(!token)
  {
    return <Navigate to='/login'/>
  }
  if (role !== "user") {
    return <Navigate to="/404"  />;
  }

  return <Outlet />;
}

export default UserRoute;