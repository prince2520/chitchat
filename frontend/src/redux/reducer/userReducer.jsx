import { toast } from "react-toastify";


export const updateUserReducer = (state, action) => {
    const {
        _id,
        name,
        status,
        highResUrl,
        lowResUrl,
        email,
    } = action.payload.user;


    state._id = _id;
    state.name = name;
    state.status = status;
    state.highResUrl = highResUrl
    state.lowResUrl = lowResUrl
    state.email = email;
    state.token = action.payload.token;
    state.isAuth = true;

    toast.success(`${action.payload.message}`);
};


export const updateIsAuthReducer = (state, action) => {
    state.isAuth = action.payload;
};


export const updateTokenReducer = (state, action) => {
    state.token = action.payload;
};