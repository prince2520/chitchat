import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import {Chat} from "./pages/Chat/Chat"
import AuthContext from "./context/authContext";
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

function App() {
  const authCtx = useContext(AuthContext);

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
        {authCtx?.isAuth && (
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
          element={<Navigate to={!authCtx.isAuth ? "/auth/login" : "/chat"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
