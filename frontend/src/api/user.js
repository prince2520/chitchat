// GET -> fetch user data
export const fetchUser = async (email, token) => {
  const result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/fetch-user?email=${email}`,
    {
      method : 'GET',  
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return result.json();
};

// PUT -> update profile details 
export const updateUser = async (token, data) => {
  const result = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/update-user`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }
  );
  return result.json();
};
