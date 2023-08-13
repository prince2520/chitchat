import './App.css';
import Chat from "./Pages/Chat/Chat";
import {Navigate, Route, Routes} from "react-router-dom";
import AuthContext from "./Context/auth";
import React, {useContext, useEffect} from "react";
import Authentication from "./Pages/Authentication/Authentication";
import Login from "./Pages/Authentication/LoginSignUp/Login/Login";
import SignUp from "./Pages/Authentication/LoginSignUp/SignUp/SignUp";
import EditProfile from "./Pages/Chat/ChatTab/EditProfile/EditProfile";
import JoinGroup from "./Pages/Chat/ChatTab/JoinGroup/JoinGroup";
import CreateGroup from "./Pages/Chat/ChatTab/CreateGroup/CreateGroup";
import AlertBox from "./Helper/AlertBox/AlertBox";
import {useDispatch, useSelector} from "react-redux";
import PrivateList from "./Pages/Chat/ChatTab/GroupPrivateList/PrivateList/PrivateList";
import GroupPrivateList from "./Pages/Chat/ChatTab/GroupPrivateList/GroupPrivateList";
import {AlertBoxActions} from "./store/alert";


let time = null;
function App() {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const showAlertBox = useSelector(state=>state.alert.showAlertBox);
    const showAlertMessage = useSelector(state=>state.alert.message);

    useEffect(() => {
        clearTimeout(time);
        if (showAlertBox) {
            time = setTimeout(() => {
                dispatch(AlertBoxActions.closeAlertBoxHandler());
            }, [3000]);
        }
    }, [dispatch, showAlertBox, showAlertMessage]);


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
