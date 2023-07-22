import {createSlice} from '@reduxjs/toolkit';

const initialUserState = {
    username: '',
    email: '',
    status: '',
    profileImageUrl: '',
    groupList: [],
    privateList: []
};

const UserSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        saveUserData(state, action){
            state.username = action.payload.username ?  action.payload.username : state.username;
            state.email = action.payload.email ? action.payload.email :  state.email;
            state.status = action.payload.status ?  action.payload.status : state.status;
            state.profileImageUrl = action.payload.profileImageUrl ? action.payload.profileImageUrl : state.profileImageUrl ;
            state.groupList = action.payload.groupList ? action.payload.groupList : state.groupList ;
            state.privateList = action.payload.privateList ? action.payload.privateList : state.privateList;
        },
        addGroupHandler(state, action){
            state.groupList = [...state.groupList, action.payload];
        }
    }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;