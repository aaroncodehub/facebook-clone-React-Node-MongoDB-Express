import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import {useStateValue} from '../contextAPI/StateProvider'
import {actionTypes} from '../contextAPI/reducer'
import "./Login.scss";

const Login = () => {

    const [, dispatch] = useStateValue()
    

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => 
      dispatch({type:actionTypes.SET_USER, payload: user.user})
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSafIn-zxBGUZi2VjvhNsAR55l2Fx2jU2sRwQ&usqp=CAU"
          alt=""
        />
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt=""
        />
      </div>
      <Button className="login__button" type="submit" onClick={signIn}>
        
        Sign In
      </Button>
    </div>
  );
};

export default Login;
