
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/css/museo.css";

import Index from "views/Index.js";
import RegisterPage from "components/Pages/RegisterPage";
import ProfilePage from "components/Pages/ProfilePage";
import Vista360 from "components/Pages/Vista360";
import LoginPage from "components/Pages/LoginPage";
import Principal from "components/Pages/Principal";
import Reportes from "components/Pages/ReportPage";
import Administracion from "components/Pages/AdminPage";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<Index />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/vista360" element={<Vista360 />} />
        <Route path="/report-page" element={<Reportes />} />
        <Route path="/admin-page" element={<Administracion />} />
        <Route path="/home" element={<Principal />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
