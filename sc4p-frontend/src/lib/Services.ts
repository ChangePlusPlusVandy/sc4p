const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserData = async (token: string | undefined) => {
  return await fetch(`${backendUrl}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
