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

// Auth
// POST -> Sign up
export const signup = async (name, email, password, confirmPassword) => {
  const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
  });
  return result.json();
};

// POST -> Login
export const login = async (email, password) => {
  const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
  return result.json();
};
