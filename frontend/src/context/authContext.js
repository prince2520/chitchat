import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../store/userSlice";
import { socketJoinGroup } from "../socket";
import {login, signup } from "../api/auth";
import {fetchUser } from "../api/user";
import { toast } from "react-toastify";


const AuthContext = React.createContext({
  loginHandler: (email, password) => {},
  signUpHandler: (userName, email, password) => {},
  logoutHandler: () => {},
  token: "",
  userId: "",
  userName: "",
  email: "",
  isAuth: false
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveUserData = useCallback(
    (result) => {
      dispatch(UserActions.saveUserData(result));
    },
    [dispatch]
  );

  const joinGroup = (groups) => {
    socketJoinGroup(groups);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsAuth(false);
    localStorage.clear();
    navigate("/auth/login");
  }, [navigate]);

  const autoLogout = useCallback(
    (milliseconds) => {
      setTimeout(() => {
        logoutHandler();
      }, milliseconds);
    },
    [logoutHandler]
  );

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
    const localUserId = localStorage.getItem("userId");
    setUserId(localUserId);
    const localEmail = localStorage.getItem("email");
    setEmail(localEmail);
    const localExpiryDate = localStorage.getItem("expiryDate");

    if(!localExpiryDate){
      return;
    }

    if ((new Date(localExpiryDate) <= new Date())) {
      setIsAuth(false);
      logoutHandler();
      return;
    }
    fetchUser(localEmail, localToken)
      .then((result) => {
        console.log('fetchUser', result);
        joinGroup(result.user.groups);
        saveUserData(result.user);
      })
      .catch((err) => console.log(err));

    const remainingMilliseconds = new Date(localExpiryDate).getTime() - new Date().getTime();
    autoLogout(remainingMilliseconds);
    setIsAuth(true);
  }, [autoLogout, logoutHandler, saveUserData]);

  const signUpHandler = useCallback((userName, email, password, confirmPassword) => {
    signup(userName, email, password, confirmPassword).then((result) => {
      if (result.success) {
        toast.success(result.message);
        navigate("/auth/login");
      }else{
        toast.error(result.message);
      }
    }).catch((err)=> toast.success(err));
  },[navigate, dispatch]);

  const loginHandler = useCallback((email, password) => {
    login(email, password).then((result) => {
      if (result.success) {
        saveUserData(result.user);

        joinGroup(result.user.groups);

        setToken(result.token);
        setUserId(result.user?._id);
        setEmail(result.user?.email);
        setIsAuth(true);

        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.user._id);
        localStorage.setItem("email", result.user?.email);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        autoLogout(remainingMilliseconds);
        navigate("/chat");
      } else {
        toast.error(result.message);
      }
    }).catch((err)=>{
      toast.error(err);
    });
  },[autoLogout, dispatch, navigate, saveUserData]);

  return (
    <AuthContext.Provider
      value={{
        loginHandler: loginHandler,
        signUpHandler: signUpHandler,
        logoutHandler: logoutHandler,
        token: token,
        userId: userId,
        isAuth: isAuth,
        email: email,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
