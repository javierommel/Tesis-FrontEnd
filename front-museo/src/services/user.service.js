import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";

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
  return axios.
      post(API_URL + "adduser", {
          user
      });
}
const updateUser = (id, data) => {
  return axios.
      post(API_URL + "updateuser", {
          id,
          data
      });
}
const getUser=()=>{
  return axios.
      post(API_URL + "getuser", {
          id,
          data
      });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addUser,
  updateUser,
  getUser
};