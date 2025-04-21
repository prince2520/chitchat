import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";

import { Chat } from "./pages/Chat/Chat";
import { UserActions } from "./redux/slice/userSlice";
import JoinGroup from "./pages/Chat/ChatTab/JoinGroup";
import EditProfile from "./pages/Chat/ChatTab/EditProfile";
import CreateGroup from "./pages/Chat/ChatTab/CreateGroup";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Authentication from "./pages/Authentication/Authentication";
import GroupPrivateList from "./pages/Chat/ChatTab/GroupPrivateList/GroupPrivateList";
import Login from "./pages/Authentication/AuthenticationLoginSignUp/AuthenticationLogin";
import SignUp from "./pages/Authentication/AuthenticationLoginSignUp/AuthenticationSignUp";

import "./App.css";
import "./assests/css/style.css";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "./redux/thunk/userThunk";
import { ChatActions } from "./redux/slice/chatSlice";
import {socketJoinGroups } from "./services/socket";

function App() {
  const { logout, autoLogout } = useAuth();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuth);


  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");
    const localExpiryDate = localStorage.getItem("expiryDate");

    if (!localExpiryDate) {
      return;
    }

    if (new Date(localExpiryDate) <= new Date()) {
      dispatch(UserActions.updateIsAuth(false));
      logout();
      return;
    }

    dispatch(getUserThunk({ email: localEmail, token: localToken }))
    .unwrap()
    .then((res) => {
      dispatch(ChatActions.saveChat({
        groups : res.user.groups,
        privates : res.user.privates,
      }));
    });
    const remainingMilliseconds =
      new Date(localExpiryDate).getTime() - new Date().getTime();

    autoLogout(remainingMilliseconds);
  }, []);

  return (
    <div className="flex-center App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/auth" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="" element={<Navigate to={"/auth/login"} />} />
        </Route>
        {isAuth && (
          <Route path="/chat" element={<Chat />}>
            <Route path="home" element={<GroupPrivateList />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="join-group" element={<JoinGroup />} />
            <Route path="create-group" element={<CreateGroup />} />
            <Route path="" element={<GroupPrivateList />} />
          </Route>
        )}
        <Route
          path="/"
          element={<Navigate to={!isAuth ? "/auth/login" : "/chat"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
