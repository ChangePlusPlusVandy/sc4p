const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserData = async (token: string | undefined, email: string) => {
  return await fetch(`${backendUrl}/user/email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmergencyContacts = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/emergency-contacts/owner/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createEmergencyContact = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/emergency-contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteEmergencyContact = async (
  token: string,
  contactId: number,
) => {
  return await fetch(`${backendUrl}/emergency-contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
