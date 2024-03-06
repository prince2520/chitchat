import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Chat from "./Pages/Chat/Chat";
import AlertBox from "./components/AlertBox/AlertBox";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Login from "./Pages/Authentication/LoginSignUp/Login";
import SignUp from "./Pages/Authentication/LoginSignUp/SignUp";
import JoinGroup from "./Pages/Chat/ChatTab/JoinGroup/JoinGroup";
import Authentication from "./Pages/Authentication/Authentication"
import EditProfile from "./Pages/Chat/ChatTab/EditProfile/EditProfile";
import CreateGroup from "./Pages/Chat/ChatTab/CreateGroup/CreateGroup";
import GroupPrivateList from "./Pages/Chat/ChatTab/GroupPrivateList/GroupPrivateList";

import { AlertBoxActions } from "./store/alert";

import AuthContext from "./context/authContext";

import "./App.css";
import "./style.css";

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
        <Route path="/" exact={true} element={<Navigate to={!authCtx.isAuth ? "/auth/login" : "/chat"}/>} />
        <Route path="*"  element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
