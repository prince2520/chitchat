import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {fetchUser, login, signup} from "../api";
import {useDispatch} from "react-redux";
import {AlertBoxActions} from "../store/alert";
import {UserActions} from "../store/user";


const AuthContext = React.createContext({
    loginHandler:(email,password)=>{},
    signUpHandler:(userName,email,password)=>{},
    logoutHandler:()=>{},
    token: '',
    userId:'',
    isAuth:false,
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveUserData = (result) =>{
        dispatch(UserActions.saveUserData({
            username: result.userName,
            email: result.email,
            profileImageUrl: result.profileImageUrl,
            status: result.Status,
            groupList: result.joinRoom,
            privateList: result.privateUser
        }));
    };

    useEffect(()=>{
        const localToken  = localStorage.getItem('token');
        setToken(localToken);
        const localUserId = localStorage.getItem('userId');
        setUserId(localUserId);
        const localExpiryDate =  localStorage.getItem('expiryDate');

        if(new Date(localExpiryDate) <= new Date()){
            setIsAuth(false)
            logoutHandler();
            return
        };

        fetchUser(localUserId, localToken).then(result=>{
            saveUserData(result.user);
        }).catch(err=>console.log(err));

        const remainingMilliseconds = new Date(localExpiryDate).getTime() - new Date().getTime();
        autoLogout(remainingMilliseconds);
        setIsAuth(true);
    },[])

    const autoLogout = (milliseconds) => {
        setTimeout(()=>{
            logoutHandler();
        },milliseconds)
    }

    const signUpHandler = (userName,email,password) => {
        signup(userName, email, password).then(result=>{
            if (result.success){
                navigate('/login');
            }else {
                dispatch(AlertBoxActions.showAlertBoxHandler(result))
            }
        });
    }

    const loginHandler = (email,password) => {
        login(email, password).then(result=>{

            if(result.success){
                saveUserData(result.user);

                setToken(result.token);
                setUserId(result.user?._id);
                setIsAuth(true);

                localStorage.setItem('token',result.token)
                localStorage.setItem('userId',result.user._id);

                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date (
                    new Date().getTime() + remainingMilliseconds
                )
                localStorage.setItem('expiryDate',expiryDate.toISOString())
                autoLogout(remainingMilliseconds);

                navigate('/chat');
            }else{
                dispatch(AlertBoxActions.showAlertBoxHandler(result))
            }
        });
    }

    const logoutHandler = () => {
        setToken(null)
        setIsAuth(false);
        navigate('/login');
        localStorage.clear();
    };

    return(
        <AuthContext.Provider value={{
            loginHandler:loginHandler,
            signUpHandler:signUpHandler,
            logoutHandler:logoutHandler,
            token: token,
            userId:userId,
            isAuth:isAuth
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
