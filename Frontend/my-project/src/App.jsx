import {
  Route,
  Routes,
  useLocation,
  Navigate
} from 'react-router-dom';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';

// User Pages
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Seepro from './Pages/Seepro.jsx';
import DetailPage from './Pages/DetailPage.jsx';
import Cart from './Pages/Cart.jsx';
import Order from './Pages/Order.jsx';
import BeginDetail from './Pages/BeginDetail.jsx';
import AfterPlace from './Pages/AfterPlace.jsx';
import MyOrder from './Pages/MyOrder.jsx';
import Notfound from './Pages/Notfound.jsx';

// Admin Pages
import AdminRegister from './Admin/AdminRegis.jsx';
import AdminHome from './Admin/AdminHome.jsx';
import AdProduct from './Admin/AdProduct.jsx';
import Updatepro from './Admin/Updatepro.jsx';
import Delpro from './Admin/Delpro.jsx';
import GetApro from './Admin/GetApro.jsx';
import AllUsers from './Admin/AllUsers.jsx';
import UserDetail from './Admin/UserDetail.jsx';

// Route Protection
import ProtectBack from './Routes/ProtectBack.jsx';
import AdminRoute from './Routes/adminRoute.jsx';
import UserRoute from './Routes/userRoute.jsx';

function App() {
  const location = useLocation();

  // Header and Footer only on user pages
  const isUserRoute =
    location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/user');

  return (
    <>
      {/* Header for user pages */}
      {isUserRoute && <Header />}

      <Routes>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminRoute />}>

          <Route
            path="/admin/home"
            element={<AdminHome />}
          />

          <Route
            path="/createProduct"
            element={<AdProduct />}
          />

          <Route
            path="/updateProduct/:id"
            element={<Updatepro />}
          />

          <Route
            path="/deleteProduct/:id"
            element={<Delpro />}
          />

          <Route
            path="/getApro"
            element={<GetApro />}
          />

          <Route
            path="/allUsers"
            element={<AllUsers />}
          />

          <Route
            path="/AuserDetail/:id"
            element={<UserDetail />}
          />

        </Route>


        {/* ================= AUTHENTICATION ROUTES ================= */}
        <Route element={<ProtectBack />}>

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

        </Route>


        {/* ================= USER ROUTES ================= */}
        <Route element={<UserRoute />}>

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/user/cart"
            element={<Cart />}
          />

          <Route
            path="/user/getAll"
            element={<Seepro />}
          />

          <Route
            path="/user/detail/:id"
            element={<DetailPage />}
          />

          <Route
            path="/user/order/:id"
            element={<Order />}
          />

          <Route
            path="/user/Bdetail/:id"
            element={<BeginDetail />}
          />

          <Route
            path="/user/getAllOrder"
            element={<AfterPlace />}
          />

          <Route
            path="/user/getMyOrder/:id"
            element={<MyOrder />}
          />

        </Route>


        {/* ================= ADMIN REGISTER ================= */}
        <Route
          path="/adminCreate"
          element={<AdminRegister />}
        />


        {/* ================= ROOT URL ================= */}
        {/* Render opens "/" first, so send user to login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={<Notfound />}
        />

      </Routes>

      {/* Footer for user pages */}
      {isUserRoute && <Footer />}

    </>
  );
}

export default App;