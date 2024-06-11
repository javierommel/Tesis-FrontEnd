import axios from "axios";
import authHeader from "./auth-header";

const API_URL2 = process.env.REACT_APP_URL_PROCESS + "ia/auth/";

const getRecommendation = (user) => {
  const formData = new FormData();
  formData.append('usuario', user);
  formData.append('tokenid', authHeader());
  return axios.post(API_URL2 + "recomendation", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'x-access-token': authHeader()
    },
  }
  );
}

export default {
  getRecommendation,
};