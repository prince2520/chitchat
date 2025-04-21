import { throwError } from "./throwError";

// GET -> fetch user data
export const fetchUser = async (email, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/fetch-user?email=${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const result =  await throwError(response);
  return result;
};

// PUT -> update profile details 
export const updateUser = async (token, data) => {
  const response = await fetch(
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
  const result = await throwError(response);
  return result;
};

// Auth
// POST -> Sign up
export const signup = async (name, email, password, confirmPassword) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
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
  const result = await throwError(response);
  return result;
};

// POST -> Login
export const login = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
  const result = await throwError(response);
  return result;
};
