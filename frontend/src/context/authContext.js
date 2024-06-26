import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActions } from "../store/userSlice";

import { fetchUser } from "../api/user";
import { login, signup } from "../api/auth";
import { socketJoinGroup } from "../services/socket";

const AuthContext = React.createContext({
  loginHandler: (email, password) => {},
  signUpHandler: (userName, email, password) => {},
  logoutHandler: () => {},
  token: "",
  userId: "",
  userName: "",
  email: "",
  isAuth: false,
});

export const AuthContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
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
    navigate("/auth/login");
    setToken(null);
    setIsAuth(false);
    localStorage.clear();
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

    if (!localExpiryDate) {
      return;
    }

    if (new Date(localExpiryDate) <= new Date()) {
      setIsAuth(false);
      logoutHandler();
      return;
    }

    fetchUser(localEmail, localToken)
      .then((result) => {
        joinGroup(result.user.groups);
        saveUserData(result.user);
      })
      .catch((err) => console.log(err));

    const remainingMilliseconds =
      new Date(localExpiryDate).getTime() - new Date().getTime();
    autoLogout(remainingMilliseconds);
    setIsAuth(true);
  }, [autoLogout, logoutHandler, saveUserData]);

  // Sign Up
  const signUpHandler = useCallback(
    (userName, email, password, confirmPassword, setLoading) => {
      setLoading(true);
      signup(userName, email, password, confirmPassword)
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            navigate("/auth/login");
          } else {
            toast.error(result.message);
          }
        })
        .catch((err) => toast.success(err))
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, dispatch]
  );

  // Login
  const loginHandler = useCallback(
    (email, password, setLoading) => {
      setLoading(true);
      login(email, password)
        .then((result) => {
          console.log('login', result);
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

            const remainingMilliseconds = 5 * 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            autoLogout(remainingMilliseconds);
            navigate("/chat");
          } else {
            toast.error(result.message);
          }
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [autoLogout, dispatch, navigate, saveUserData]
  );

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
