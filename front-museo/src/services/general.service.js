import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const API_URL1 = "http://localhost:8080/api/general/";

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

const getCountry = () => {
  return axios.post(API_URL1 + "getcountries", {

  });
}

function base64toBlob(base64) {
  console.log("asdfd: " + base64)
  if (!base64) return null;
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
const getContent = () => {
  return axios.post(API_URL1 + "getcontent", {

  });
}

const updateContent = (data, usuario_modificacion, imagen1, imagen2, imagen3, imagen4) => {
  const formData = new FormData();
  formData.append('imagen1', base64toBlob(imagen1));
  formData.append('imagen2', base64toBlob(imagen2));
  formData.append('imagen3', base64toBlob(imagen3));
  formData.append('imagen4', base64toBlob(imagen4));
  formData.append('data', JSON.stringify(data));
  formData.append('usuario_modificacion', usuario_modificacion);
  return axios.post(API_URL1 + "updatecontent", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  )
}
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getCountry,
  getContent,
  updateContent,
};