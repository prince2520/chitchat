import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socketJoinGroup } from "../services/socket";
import { useCallback } from "react";

export function useAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const authTimer = useCallback((res) => {

        socketJoinGroup(res.user.groups);

        // add new token in local storage and set expiry date
        localStorage.setItem("token", res.token);
        localStorage.setItem("_id", res.user._id);
        localStorage.setItem("email", res.user?.email);

        const remainingMilliseconds = 24 * 60 * 60 * 1000;

        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem("expiryDate", expiryDate.toISOString());
        autoLogout(remainingMilliseconds);
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        navigate("/auth/login");
//        dispatch(resetState());
        toast.success("Successfully Logout!");
    }, [dispatch]);

    const autoLogout = useCallback((milliseconds) => {
        navigate("/chat");

        setTimeout(() => {
            logout();
        }, milliseconds);
    }, [logout]);

    return { logout, autoLogout, authTimer };
}