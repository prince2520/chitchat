export const throwError = async (result) => {
    const data = await result.json();

    if (!result.ok) {
        throw new Error(data.message || "Something went wrong!");
    }

    return data;
};