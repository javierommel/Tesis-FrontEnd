import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const API_URL1 = "http://localhost:8080/api/auth/";

function base64toBlob(base64) {
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
const updateUser = (id, data, usuario_modificacion, roles, image) => {
  if (image) {
    console.log("image: "+JSON.stringify(data))
    const formData = new FormData();
    formData.append('avatar', base64toBlob(image));
    formData.append('id', id);
    formData.append('data', JSON.stringify(data));
    formData.append('usuario_modificacion', usuario_modificacion);
    formData.append('roles', JSON.stringify(roles));
    return axios.post(API_URL1 + "updateuserprofile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
  }
  else {
    return axios.post(API_URL1 + "updateuser", {
      id,
      data,
      usuario_modificacion,
      roles,
      image:null
    });
  }

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
    usuario_modificacion: user
  });
}
const getUserId = (usuario) => {
  return axios.post(API_URL1 + "getuserid", {
    usuario
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
  deleteUser,
  getUserId
};
