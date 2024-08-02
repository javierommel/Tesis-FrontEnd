
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from 'react-google-login'
import { logout } from "./actions/auth";
import AuthVerify from "./commons/auth-verify";


import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/css/museo.css";

import Index from "components/Pages/Index";
import RegisterPage from "components/Pages/RegisterPage";
import ProfilePage from "components/Pages/ProfilePage";
import Vista360 from "components/Pages/Vista360";
import LoginPage from "components/Pages/LoginPage";
import Principal from "components/Pages/Principal";
import Reportes from "components/Pages/ReportPage";
import Administracion from "components/Pages/AdminPage";

const App = () => {
    const clientId = process.env.REACT_APP_CLIENTE_ID

    const onLogoutSuccess = () => {
        localStorage.removeItem('isGoogleLogin');
        console.log("Log out correctamente")
    }
    const onFailure = () => {
        localStorage.removeItem('isGoogleLogin');
        console.error("Error al salir salio")
    }
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        const isgoogleogin = localStorage.getItem("isGoogleLogin")
        if (isgoogleogin) {
            const user = localStorage.getItem("user")
            if(user) signOut();
            else localStorage.removeItem('isGoogleLogin');
        }
        dispatch(logout(currentUser.id, currentUser.accessToken));
    }, [dispatch]);

    return (
        <div>
            <div>
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
            </div>
            {/*<AuthVerify logOutA={logOut} />*/}
        </div>
    );
};

export default App;
