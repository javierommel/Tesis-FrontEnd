import axios from "axios";
import authHeader from "./auth-header";

const API_URL1 = process.env.REACT_APP_URL_BACK + "api/auth/";

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

async function urlToBlob(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const uInt8Array = new Uint8Array(arrayBuffer);
  const blob = new Blob([uInt8Array], { type: response.headers.get("content-type") });
  return blob;
}

const addUser = (estado, name, username, email, password, country, year, usuario_modificacion, roles) => {
  if (!roles.length === 0) roles = "user"
  if (!usuario_modificacion) usuario_modificacion = "admin"
  return axios.post(API_URL1 + "signup",
    {
      estado,
      name,
      user: username,
      email,
      password,
      pais: country,
      nacimiento: year,
      usuario_modificacion,
      roles
    },
    {
      headers: {
        'x-access-token': authHeader()
      }
    });
}
const updateUser = (id, data, usuario_modificacion, roles, image) => {
  if (image) {
    const formData = new FormData();
    formData.append('avatar', base64toBlob(image));
    formData.append('id', id);
    formData.append('data', JSON.stringify(data));
    formData.append('usuario_modificacion', usuario_modificacion);
    formData.append('roles', roles ? JSON.stringify(roles) : null);
    return axios.post(API_URL1 + "updateuserprofile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'x-access-token': authHeader(),
      },
    }
    );
  }
  else {
    return axios.post(API_URL1 + "updateuser",
      {
        id,
        data,
        usuario_modificacion,
        roles: roles ? roles : null,
      },
      {
        headers: {
          'x-access-token': authHeader()
        }
      });
  }

}
const getUser = (page, pageSize) => {
  return axios.post(API_URL1 + "getuser",
    {
      page,
      pageSize,
    },
    {
      headers: {
        'x-access-token': authHeader()
      }
    });
}
const deleteUser = (id, user) => {
  return axios.post(API_URL1 + "deleteuser",
    {
      id,
      usuario_modificacion: user
    },
    {
      headers: {
        'x-access-token': authHeader()
      }
    }
  );
}
const getUserId = (usuario,) => {
  return axios.post(API_URL1 + "getuserid",
    {
      usuario
    },
    {
      headers: {
        'x-access-token': authHeader()
      }
    });
}
const addUserGoogle = async (name, username, email, imagen) => {
  const imagenblob = await urlToBlob(imagen)
  const formData = new FormData();
  formData.append('avatar', imagenblob);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('user', username);
  return axios.post(API_URL1 + "addusergoogle", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


export default {
  addUser,
  updateUser,
  getUser,
  deleteUser,
  getUserId,
  addUserGoogle
};
