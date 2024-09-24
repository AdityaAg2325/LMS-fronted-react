import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'

import "./App.css";
import AdminDashboard from "./components/admin/adminDashboard/AdminDashboard";
import UserDashboard from "./components/user/userDashboard/UserDashboard";
import Home from "./pages/homePage/Home";
import Navbar from "./components/shared/navbar/Navbar";
import BooksAdmin from "./components/admin/booksAdmin/BooksAdmin";
import CategoriesAdmin from "./components/admin/categoriesAdmin/CategoriesAdmin";
import UsersAdmin from "./components/admin/usersAdmin/UsersAdmin";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import IssuanceAdmin from "./components/admin/issuanceAdmin/IssuanceAdmin";
import { login } from "./redux/authentication/authActions";
import { getUserByToken } from "./service/UserService";
import UserHistory from "./components/admin/userHistory/UserHistory";
import BookHistory from "./components/admin/bookHistory/BookHistory";
import ContactUs from "./components/shared/contactUs/ContactUs";
import AboutUs from "./components/shared/aboutUs/AboutUs";
import Loader from "./components/shared/loader/Loader";
import NotFound from "./pages/notFound/NotFound";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const token = window.localStorage.getItem('authtoken')
    if(token){
      getUser(token)
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setLoading(true);
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [location])

  const getUser = async (token) => {
    try{
      const data = await getUserByToken(token);
      
      dispatch(login(data))
      window.localStorage.setItem('authtoken', data.token)
    } catch(error){
      navigate('/')
    }
  }


  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminRoutes> <AdminDashboard /> </AdminRoutes>} />
        <Route path="/user" element={<UserRoutes><UserDashboard /></UserRoutes>} />
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path="/books" element={<AdminRoutes><BooksAdmin /></AdminRoutes>} />
        <Route path="/users" element={<AdminRoutes><UsersAdmin /></AdminRoutes>} />
        <Route path="/categories" element={<AdminRoutes><CategoriesAdmin /></AdminRoutes>} />
        <Route path="/issuance" element={<AdminRoutes><IssuanceAdmin /></AdminRoutes>} />
        <Route path="/user-history/:mobileNumber" element={<AdminRoutes><UserHistory /></AdminRoutes>} />
        <Route path="/book-history/:id" element={<AdminRoutes><BookHistory /></AdminRoutes>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

