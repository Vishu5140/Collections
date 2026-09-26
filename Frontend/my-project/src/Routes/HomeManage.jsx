import { Navigate, Outlet } from "react-router-dom";

function HomeManage() {
 const token=localStorage.getItem("token");
 const role=localStorage.getItem("role");
 if(token)
 {
    if(role!=="admin")
        return <Navigate to="/home" replace/>;
    if(role!=="user")
        return <Navigate to="/admin/home" replace/>;

    return <Outlet/>;
 }
}

export default HomeManage