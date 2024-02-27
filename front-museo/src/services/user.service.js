import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const API_URL1 = "http://localhost:8080/api/auth/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const addUser = (name, username, email, password, country, year, usuario_modificacion, roles) => {
  if (!roles.length === 0) roles = "user"
  if (!usuario_modificacion) usuario_modificacion = "admin"
  return axios.post(API_URL1 + "signup", {
    name: name,
    user: username,
    email,
    password,
    pais: country,
    nacimiento: year,
    usuario_modificacion,
    roles
  });
}
const updateUser = (id, data, usuario_modificacion, roles) => {
  console.log("id: "+id+" data: "+JSON.stringify(data) +"us: "+usuario_modificacion+"roles: "+roles)
  return axios.post(API_URL1 + "updateuser", {
    id,
    data,
    usuario_modificacion,
    roles
  });
}
const getUser = (page, pageSize) => {
  return axios.post(API_URL1 + "getuser", {
    page,
    pageSize,
  });
}
const deleteUser = (id, user) => {
  return axios.post(API_URL1 + "deleteuser", {
    id,
    usuario_modificacion:user
  });
}


export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addUser,
  updateUser,
  getUser,
  deleteUser
};