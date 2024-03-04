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

export const fetchUser = async (email, token) => {
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



export const addUserInPrivate = async (token, userId, chatId) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/create-private`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
        chatId: chatId
      })
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


export const sendPrivateMessageHandler = async (msgData) => {
  let result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/send-private-message`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + msgData.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgData),
    }
  );
  return result.json();
};
