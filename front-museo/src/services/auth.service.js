import axios from "axios";
import {encrypt} from "../commons/crypto";

const API_URL = process.env.REACT_APP_URL_BACK + "api/auth/";

const register = (name, username, email, password, country, year) => {
    return axios.post(API_URL + "signup", {
            name: encrypt(name),
            user: encrypt(username),
            email:encrypt(email),
            password:encrypt(password),
            pais: country,
            nacimiento: year,
            usuario_modificacion: encrypt("admin"),
        });
}

const login = (username, password, google) => {
    return axios
        .post(API_URL + "signin", {
            user: encrypt(username),
            password: encrypt(password),
            google
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const verifyTokenConfirmation = (token) => {
    return axios
        .post(API_URL + "verifyconfirmationtoken", {
            token
        });
};
const logout = (user, token) => {
    localStorage.removeItem("user");
    const logout=true
    axios
        .post(API_URL + "savequestion", {
            user,
            token,
            logout,
        },
        {
          headers: {
            'x-access-token': token
          }
        });
};

export default {
    register,
    login,
    logout,
    verifyTokenConfirmation
};