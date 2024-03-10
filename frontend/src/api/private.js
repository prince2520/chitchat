// create a new private
export const createPrivate = async (token, userId, chatId) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/private/create-private`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId,
        chatId
      })
    }
  );
  return response.json();
};


// save private message
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

// delete private 
export const deletePrivate = async(data) => {
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
