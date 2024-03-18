// POST -> url website data
export const urlWebsiteData = async (data) => {
  const result = await fetch(
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
  return result.json();
};
