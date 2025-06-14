import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
// react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom"
import "./App.css"
// pages
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import CreateUser from "./Components/Users/CreateUser";
import UpdateUser from "./Components/Users/UpdateUser";
import SingleUser from "./Components/Users/SingleUser";
import PremiumTools from "./Pages/PremiumTools";
import CreatePremiumTools from "./Components/PremiumTools/CreatePremiumTools";
import UpdatePremiumTools from "./Components/PremiumTools/UpdatePremiumTools";
import Appointment from "./Pages/Appointment";
import ContactForm from "./Pages/ContactForm";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/table" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/view/:id" element={<SingleUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/premium-tools/table" element={<PremiumTools />} />
        <Route path="/premium-tools/create" element={<CreatePremiumTools />} />
        <Route path="/premium-tools/update" element={<UpdatePremiumTools />} />
        <Route path="/appointment/table" element={<Appointment />} />
        <Route path="/contact-form/table" element={<ContactForm />} />
      </Routes>
    </>
  )
}

export default App