// create a new group
export const createGroup = async (token, name, highResUrl, lowResUrl) => {
  let data = {
    name: name,
    highResUrl: highResUrl,
    lowResUrl : lowResUrl
  };

  const result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/group/create-group`,
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

// join a group
export const joinGroup = async (token, groupId, userId) => {
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
        userId,
      }),
    }
  );
  return result.json();
};

// save group message
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

// delete a group
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

