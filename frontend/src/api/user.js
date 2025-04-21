import { throwError } from "../redux/api/throwError";

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
  const result = throwError(response);
  return result;
};


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
  const result = throwError(response);
  return result;
}