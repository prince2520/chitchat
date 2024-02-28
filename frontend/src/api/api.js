export const signup = async (name, email, password) => {
  let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  return result.json();
};

export const login = async (email, password) => {
  let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return result.json();
};

export const fetchUser = async (userId, token) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/fetchUser?userId=${userId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return result.json();
};

export const saveProfile = async (token, data) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/saveProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }
  );

  return result.json();
};

export const createGroup = async (token, name, userId, groupUrl) => {
  let data = {
    name: name,
    token: token,
    userId: userId,
    groupImageUrl: groupUrl,
  };

  if (groupUrl) {
    data.groupImageUrl = groupUrl;
  }

  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/group/createGroup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }
  );

  return result.json();
};

export const searchUserHandler = async (token, email) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/fetchUser?email=${email}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return result.json();
};

export const fetchPrivateUserHandler = async (userId, token) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/fetchPrivateUser?userId=${userId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return result.json();
};

export const addUserInPrivateChat = async (token, senderId, receiverId) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/addPrivateChat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
        token: token,
      }),
    }
  );

  return response.json();
};

export const joinGroupHandler = async (token, groupId, userId) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/group/joinGroup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        groupId: groupId,
        userId: userId,
      }),
    }
  );

  return result.json();
};

export const sendGroupMessageHandler = async (msgData) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/group/sendGroupMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + msgData.token,
      },
      body: JSON.stringify(msgData),
    }
  );
  return result.json();
};

export const fetchGroupMessages = async (groupName, token) => {
  let res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/group/fetchRoomMessages?roomName=${groupName}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.json();
};

export const fetchPrivateMessage = async (senderId, receiverId, token) => {
  const fetchMessage = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/fetchPrivateMessage?senderId=${senderId}&receiverId=${receiverId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return fetchMessage.json();
};

export const sendPrivateMessageHandler = async (
  token,
  senderId,
  receiverId,
  message,
  isOpenAIMsg,
  messageType,
  size,
  url
) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/sendPrivateMessage`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        isOpenAIMsg: isOpenAIMsg,
        messageType: messageType,
        size: size,
        url: url,
      }),
    }
  );

  return result.json();
};
