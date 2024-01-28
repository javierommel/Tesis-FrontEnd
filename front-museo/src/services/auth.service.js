import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (name, username, email, password, country, year) => {
    return axios.
        post(API_URL + "signup", {
            name: name,
            user: username,
            email,
            password,
            pais: country,
            nacimiento: year,
            usuario_modificacion: "admin"
        });
}

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            user:username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};