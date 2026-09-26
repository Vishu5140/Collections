import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ProtectBack from './Routes/ProtectBack.jsx';
import AdminRegister from './Admin/AdminRegis.jsx';
import AdminRoute from './Routes/adminRoute.jsx';
import AdProduct from './Admin/AdProduct.jsx';
import Updatepro from './Admin/Updatepro.jsx';
import Seepro from './Pages/Seepro.jsx';
import DetailPage from './Pages/DetailPage.jsx';
import Delpro from './Admin/Delpro.jsx';
import GetApro from './Admin/GetApro.jsx';
import Cart from './Pages/Cart.jsx';
import Order from './Pages/Order.jsx';
import AllUsers from './Admin/AllUsers.jsx';
import AdminHome from './Admin/AdminHome.jsx';
import BeginDetail from './Pages/BeginDetail.jsx';
import AfterPlace from './Pages/AfterPlace.jsx';
import MyOrder from './Pages/MyOrder.jsx';
import UserRoute from './Routes/userRoute.jsx';
import Notfound from './Pages/Notfound.jsx';
import UserDetail from './Admin/UserDetail.jsx';

function App() {
  const location=useLocation();
  const IsUserRoute=location.pathname.startsWith("/home") ||
   location.pathname.startsWith("/user");
  return (
   <>
    {IsUserRoute && <Header/>}
   <Routes>
    // for admin
    <Route  element={<AdminRoute/>} >
    <Route path="/admin/home" element={<AdminHome/>}/>
    <Route path="/createProduct" element={<AdProduct/>}/>
    <Route path="/updateProduct/:id" element={<Updatepro/>}/>
    <Route path="/deleteProduct/:id" element={<Delpro/>}/>
    <Route path="/getApro" element={<GetApro/>}/>
    <Route path='/allUsers' element={<AllUsers/>}/>
    <Route path='/AuserDetail/:id' element={<UserDetail/>}/>
</Route>
// for authentication
   <Route element={<ProtectBack/>}>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
   </Route>
   // for user route
   <Route element={<UserRoute/>} >
     <Route path="/home" element={<Home/>}/>
      <Route path='/user/cart' element={<Cart/>}/>
       <Route path='/user/getAll' element={<Seepro/>}/>
         <Route path='/user/detail/:id' element={<DetailPage/>}/>
             <Route path='/user/order/:id' element={<Order/>}/>
          <Route path='/user/Bdetail/:id' element={<BeginDetail/>}/>
          <Route path='/user/getAllOrder' element={<AfterPlace/>}/>
          <Route path='/user/getMyOrder/:id' element={<MyOrder/>}/>
   </Route>
    
    <Route path="/adminCreate" element={<AdminRegister/>}/>
      <Route path="*" element={<Notfound/>}/>
    </Routes>
    {IsUserRoute &&<Footer/>}
   
   </>
  )
}

export default App