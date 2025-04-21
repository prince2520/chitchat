import { throwError } from "../redux/api/throwError";

// POST -> url website data
export const urlWebsiteDataAPI = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/helper/url-website-data`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = throwError(response);
  return result;
};
