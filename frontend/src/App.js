import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";

import Chat from "./Pages/Chat/Chat";
import AlertBox from "./components/AlertBox/AlertBox";
import JoinGroup from "./Pages/Chat/ChatTab/JoinGroup/JoinGroup";
import Authentication from "./Pages/Authentication/Authentication";
import Login from "./Pages/Authentication/LoginSignUp/Login/Login";
import SignUp from "./Pages/Authentication/LoginSignUp/SignUp/SignUp";
import EditProfile from "./Pages/Chat/ChatTab/EditProfile/EditProfile";
import CreateGroup from "./Pages/Chat/ChatTab/CreateGroup/CreateGroup";
import PrivateList from "./Pages/Chat/ChatTab/GroupPrivateList/PrivateList/PrivateList";
import GroupPrivateList from "./Pages/Chat/ChatTab/GroupPrivateList/GroupPrivateList";

import AuthContext from "./context/auth";

import './App.css';

function App() {
    const authCtx = useContext(AuthContext);
    const showAlertBox = useSelector(state=>state.alert.showAlertBox);

    return (
        <div className="App">
            {showAlertBox && <AlertBox/>}
            <Routes>
                {!authCtx?.isAuth && <Route path='/' element={<Authentication/>}>
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<SignUp/>}/>
                    <Route path='' element={<Navigate to={'login'}/>}/>
                </Route>}
                {authCtx?.isAuth && <Route path='/' element={<Chat/>}>
                    <Route path='chat' element={<GroupPrivateList/>}/>
                    <Route path='edit-profile' element={<EditProfile/>}/>
                    <Route path='join-group' element={<JoinGroup/>}/>
                    <Route path='create-group' element={<CreateGroup/>}/>
                    <Route path='private-chat' element={<PrivateList/>}/>
                    <Route path='' element={<Navigate to={'chat'}/>}/>
                </Route>}
            </Routes>
        </div>
    );
}

export default App;
