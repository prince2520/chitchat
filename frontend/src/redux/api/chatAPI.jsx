// PRIVATE

import { throwError } from "./throwError";

// POST -> create a new group
export const createGroupAPI = async (token, data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/create-group`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ ...data }),
        }
    );
    const result = await throwError(response);
    return result;

};

// PUT -> join a group
export const joinGroupAPI = async (token, groupId, _id) => {
    let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/join-group`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                groupId,
                _id,
            }),
        }
    );
    const result = await throwError(response);
    return result;
};

// PUT -> save group message
export const saveGroupMessageAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/save-group-message`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );
    const result = await throwError(response);
    return result;
};


// DELETE -> leave group 
export const leaveGroupAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/leave-group`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );
    const result = await throwError(response);
    return result;
};


// DELETE -> delete a group
export const deleteGroupAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/delete-group`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );
    const result = await throwError(response);
    return result;
};

// DELETE -> remove user from group
export const removeUserGroupAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/remove-user`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );
    const result = await throwError(response);
    return result;
};

// PUT -> edit a group 
export const updateGroupAPI = async (data) => {

    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/edit-group`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await throwError(response);
    return result;
};

// PUT -> block user from group 
export const blockUserGroupAPI = async (data) => {

    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/block-user`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await throwError(response);
    return result;
};


// PUT -> unblock user from group 
export const unblockUserGroupAPI = async (data) => {

    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/group/unblock-user`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await throwError(response);
    return result;
};




// PRIVATE 

// POST -> create a new private
export const createPrivateAPI = async (token, _id, chatId) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/private/create-private`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                _id,
                chatId
            })
        }
    );
    const result = await throwError(response);
    return result;
};


// PUT -> save private message
export const savePrivateMessageAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/private/save-private-message`,
        {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    );
    const result = await throwError(response);
    return result;
};


// DELETE -> delete private 
export const deletePrivateAPI = async (data) => {
    const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/private/delete-private`,
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    );
    const result = await throwError(response);
    return result;
}
