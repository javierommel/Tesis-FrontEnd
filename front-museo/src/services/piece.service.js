import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const API_URL1 = "http://localhost:8080/api/auth/";
const API_URL2 = "http://localhost:5000/servicio1/";

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

function base64toBlob(base64) {
  console.log("asdfd: "+base64)
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

const addPiece = (file) => {
  const formData = new FormData();
  formData.append('archivo', file);
  return axios.post(API_URL2 + "cargar_archivo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
}
const updatePiece = (id, data, usuario_modificacion, materiales, deterioros, imagen1, imagen2) => {
  const formData = new FormData();
  formData.append('imagen1', base64toBlob(imagen1));
  formData.append('imagen2', base64toBlob(imagen2));
  formData.append('id', id);
  formData.append('data', JSON.stringify(data));
  formData.append('materiales', JSON.stringify(materiales));
  formData.append('deterioros', JSON.stringify(deterioros));
  formData.append('usuario_modificacion', usuario_modificacion);
  return axios.post(API_URL1 + "updatepiece", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  )
}
const deletePiece = (id, user) => {
  return axios.post(API_URL1 + "deletepiece", {
    id,
    usuario_modificacion: user
  });
}

const getPiece = (page, pageSize) => {
  return axios.
    post(API_URL1 + "getpiece", {
      page,
      pageSize,
    });
}
const getInformationPiece = () => {
  return axios.
    post(API_URL1 + "getinformationpiece", {
    });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addPiece,
  updatePiece,
  getPiece,
  getInformationPiece,
  deletePiece
};