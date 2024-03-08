import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { AlertBoxActions } from "./store/alertSlice";

import Chat from "./pages/Chat/Chat";
import AuthContext from "./context/authContext";
import AlertBox from "./components/AlertBox/AlertBox";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Login from "./pages/Authentication/AuthenticationLoginSignUp/AuthenticationLogin";
import SignUp from "./pages/Authentication/AuthenticationLoginSignUp/AuthenticationSignUp";
import JoinGroup from "./pages/Chat/ChatTab/JoinGroup/JoinGroup";
import Authentication from "./pages/Authentication/Authentication"
import EditProfile from "./pages/Chat/ChatTab/EditProfile/EditProfile";
import CreateGroup from "./pages/Chat/ChatTab/CreateGroup/CreateGroup";
import GroupPrivateList from "./pages/Chat/ChatTab/GroupPrivateList/GroupPrivateList";

import "./App.css";
import "./assests/css/style.css";

let time = null;

function App() {
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);
  const alertBoxData = useSelector((state) => state.alert.message);
  const showAlertBox = useSelector((state) => state.alert.showAlertBox);

  useEffect(() => {
    clearTimeout(time);
    if (showAlertBox) {
      time = setTimeout(() => {
        dispatch(AlertBoxActions.closeAlertBoxHandler());
      }, [3000]);
    }
  }, [dispatch, showAlertBox, alertBoxData]);

  return (
    <div className="flex-center App">
      {showAlertBox && <AlertBox />}
      <Routes>
        {!authCtx.isAuth && (<Route path="/auth" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="" element={<Navigate to={"/auth/login"} />} />
        </Route>)}
        {authCtx?.isAuth && (
          <Route path="/chat" element={<Chat />}>
            <Route path="" element={<GroupPrivateList />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="join-group" element={<JoinGroup />} />
            <Route path="create-group" element={<CreateGroup />} />
          </Route>
        )}
        <Route path="/"  element={<Navigate to={!authCtx.isAuth ? "/auth/login" : "/chat"}/>} />
        <Route path="*"  element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
