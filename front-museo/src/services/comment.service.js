import axios from "axios";
import authHeader from "./auth-header";

const API_URL1 = process.env.REACT_APP_URL_BACK+"api/auth/";

const addComment = (comentario, puntuacion, usuario) => {
  return axios.post(API_URL1 + "addcomment", {
    comentario,
    puntuacion,
    usuario,
  },
  {
    headers: {
      'x-access-token': authHeader()
    }
  });
}
const updateComment = (id, estado, usuario_modificacion) => {
  return axios.post(API_URL1 + "updatecomment", {
    id,
    estado,
    usuario_modificacion,
  },
  {
    headers: {
      'x-access-token': authHeader()
    }
  });
}
const getCommentList = (page, pageSize) => {
  return axios.post(API_URL1 + "getcomment", {
    page,
    pageSize,
  },
  {
    headers: {
      'x-access-token': authHeader()
    }
  });
}
const deleteComment = (id, usuario_modificacion) => {
  return axios.post(API_URL1 + "deletecomment", {
    id,
    usuario_modificacion
  }),
  {
    headers: {
      'x-access-token': authHeader()
    }
  };
}
const getComment = (page, pageSize, usuario) => {
  return axios.post(API_URL1 + "getcommentprincipal", {
    page,
    pageSize,
    usuario,
  });
}

const favouriteComment = (id, usuario_modificacion, destacado) => {
  return axios.post(API_URL1 + "favouritecomment", {
    id,
    usuario_modificacion,
    destacado: destacado === 0 ? 1 : 0,
  }, {
    headers: {
      'x-access-token': authHeader()
    }
  });
}

export default {
  addComment,
  updateComment,
  getComment,
  deleteComment,
  getCommentList,
  favouriteComment,
};