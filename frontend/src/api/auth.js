// sign up
export const signup = async (name, email, password) => {
  const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  });
  return result.json();
};

// login
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
