// PRIVATE
// POST -> create a new group
export const createGroup = async (token, data) => {
    const result = await fetch(
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
    return result.json();
};

// PUT -> join a group
export const joinGroup = async (token, groupId, _id) => {
    let result = await fetch(
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
    return result.json();
};

// PUT -> save group message
export const saveGroupMessage = async (data) => {
    const result = await fetch(
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
    return result.json();
};


// DELETE -> leave group 
export const leaveGroup = async (data) => {
    const result = await fetch(
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
    return result.json();
};


// DELETE -> delete a group
export const deleteGroup = async (data) => {
    const result = await fetch(
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
    return result.json();
};

// DELETE -> remove user from group
export const removeUserGroup = async (data) => {
    const result = await fetch(
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
    return result.json();
};

// PUT -> edit a group 
export const updateGroup = async (data) => {

    const result = await fetch(
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

    return result.json();
};

// PUT -> block user from group 
export const blockUserGroup = async (data) => {

    const result = await fetch(
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

    return result.json();
};


// PUT -> unblock user from group 
export const unblockUserGroup = async (data) => {

    const result = await fetch(
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

    return result.json();
};




// PRIVATE 

// POST -> create a new private
export const createPrivate = async (token, _id, chatId) => {
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
    return response.json();
};


// PUT -> save private message
export const savePrivateMessage = async (data) => {
    const result = await fetch(
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
    return result.json();
};


// DELETE -> delete private 
export const deletePrivate = async (data) => {
    const result = await fetch(
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
    return result.json();
}
