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

const addPiece = (user) => {
  return axios.
      post(API_URL + "addpiece", {
          user
      });
}
const updatePiece = (id, data) => {
  return axios.
      post(API_URL + "updatepiece", {
          id,
          data
      });
}
const getPiece=(page, pageSize)=>{
  return axios.
      post(API_URL1 + "getpiece", {
        page, 
        pageSize, 
      });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addPiece,
  updatePiece,
  getPiece
};