import axios from "axios";

const API_URL = process.env.REACT_APP_URL_BACK + "api/auth/";

const register = (name, username, email, password, country, year) => {
    return axios.post(API_URL + "signup", {
            name: name,
            user: username,
            email,
            password,
            pais: country,
            nacimiento: year,
            usuario_modificacion: "admin",
        });
}

const login = (username, password, google) => {
    return axios
        .post(API_URL + "signin", {
            user: username,
            password,
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
    axios
        .post(API_URL + "savequestion", {
            user,
            token,
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