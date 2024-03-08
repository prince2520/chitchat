// create a new group
export const createGroup = async (token, name, groupImageUrl) => {
  let data = {
    name: name,
    groupImageUrl: groupImageUrl,
  };

  if (groupImageUrl) {
    data.groupImageUrl = groupImageUrl;
  }

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
        userId
      })
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
      body: JSON.stringify(data)
    }
  );
  return result.json();
};
