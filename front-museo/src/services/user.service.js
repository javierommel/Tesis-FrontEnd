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

const addUser = (user) => {
  return axios.post(API_URL1 + "adduser", {
    user
  });
}
const updateUser = (id, data) => {
  return axios.post(API_URL1 + "updateuser", {
      id,
      data
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
      user
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