import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        console.log("user: "+user)
      const decodedJwt = parseJwt(user.accessToken);
        console.log("esp: "+(decodedJwt.exp * 1000)+ " date:"+Date.now())
        console.log(decodedJwt.exp * 1000 < Date.now())
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return ;
};

export default AuthVerify;