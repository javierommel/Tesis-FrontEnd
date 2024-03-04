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

const addComment = (comentario, puntuacion, usuario) => {
  return axios.post(API_URL1 + "addcomment", {
    comentario,
    puntuacion,
    usuario,
  });
}
const updateComment = (id, estado, usuario_modificacion) => {
  return axios.post(API_URL1 + "updatecomment", {
    id,
    estado,
    usuario_modificacion,
  });
}
const getCommentList = (page, pageSize) => {
  return axios.post(API_URL1 + "getcomment", {
    page,
    pageSize,
  });
}
const deleteComment = (id, usuario_modificacion) => {
  return axios.post(API_URL1 + "deletecomment", {
    id,
    usuario_modificacion
  });
}
const getComment = (page, pageSize, usuario) => {
  return axios.post(API_URL1 + "getcommentprincipal", {
    page,
    pageSize,
    usuario,
  });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addComment,
  updateComment,
  getComment,
  deleteComment,
  getCommentList
};