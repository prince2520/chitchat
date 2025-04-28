import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

let logoutTimer = null;

export function useAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const authTimer = useCallback((res) => {

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
        toast.success("Successfully Logout!");
    }, [dispatch]);

    const autoLogout = useCallback((milliseconds) => {
        if (logoutTimer != null) {
            clearTimeout(logoutTimer);
            logoutTimer = null;
        }

        logoutTimer = setTimeout(() => {
            logout();
        }, milliseconds);

        navigate("/chat");

    }, [logout]);

    return { logout, autoLogout, authTimer };
}