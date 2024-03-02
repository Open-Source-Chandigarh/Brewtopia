import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Sign from "./sign-up";
import Cookies from "universal-cookie";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import PaymentSuccess from "./paymentsuccess";
import Dashboard from "./Admin/Dashboard";
import { SidebarProvider } from "./context/sidebarContext";
import { FilterProvider } from "./context/FilterContext";
import Search from "./components/Search";
import Forgetpassword from "./Forgetpassword";
import EmailSentConfirmation from "./EmailSentConfirmation";
import PasswordResetConfirmation from "./PasswordResetConfirmation";
import PasswordResetLinkExpired from "./PasswordResetLinkExpired";
import ResetPassword from "./ResetPassword";
import Layout from "./components/Layout";
import LoginProvider from "./context/LoginContext";
import ShowProvider from "./context/showCartOrders";

const root = ReactDOM.createRoot(document.getElementById("root"));

const cookies = new Cookies();
const user = cookies.get("username");

root.render(
  <>
  <LoginProvider>
  <FilterProvider>
  <SidebarProvider>
    <BrowserRouter>
      <Routes>

        {/* main route shopping page */}
        <Route exact path="/" element={user ?<ShowProvider><Layout><App /></Layout></ShowProvider>: <Navigate replace to="/login"/> } />

        {/* Login Routes */}
        <Route exact path="/login" element={user ? <Navigate replace to="/"/> : <Login/>} />
        <Route path="/sign-up" element={user ? <Navigate replace to="/"/>:<Sign/>}></Route>

        {/* payment routes */}
        <Route path="/paymentsuccess" element={<PaymentSuccess />}></Route>

        {/* password reset routes */}
        <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
        <Route path="/emailconfirmation" element={<EmailSentConfirmation />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/resetpasswordconfirmation" element={<PasswordResetConfirmation />}></Route>
        <Route path="/resetlinkexpired" element={<PasswordResetLinkExpired />}></Route>

        <Route path="/Search" element={<Search/>}></Route>

        {/* if no page found then navigate to /login */}
        <Route exact path="/*" element={user ? <Navigate replace to="/" /> : <Navigate replace to="/login" />} />
        
      </Routes>
    </BrowserRouter>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 2000,
          style: {
            border: '1px solid #713200',
            padding: '10px',
            borderRadius : '35px',
            color: '#3B2F2F',
            fontFamily : 'Poppins',
            fontSize : "14px",
            background : "#fff",
          },
          iconTheme: {
            primary: '#00a500',
            secondary: '#fff',
          },
        },
        error: {
          duration: 2000,
          style: {
            border: '1px solid #713200',
            padding: '10px',
            borderRadius : '35px',
            color: '#3B2F2F',
            background : "#fff",
            fontFamily : 'Poppins',
            fontSize : "14px"
          },
          iconTheme: {
            primary: '#ff2828',
            secondary: '#fff',
          },
        },
      }}
    />
    </SidebarProvider>
    </FilterProvider>
    </LoginProvider>
  </>
);
