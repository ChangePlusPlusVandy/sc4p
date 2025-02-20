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

export const getCaregivers = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/caregiver/owner/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCaregiver = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/caregiver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteCaregiver = async (token: string, caregiverId: number) => {
  return await fetch(`${backendUrl}/caregiver/${caregiverId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBoardingFacilities = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/boarding-fac/owner/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBoardingFacility = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/boarding-fac`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteBoardingFacility = async (
  token: string,
  facilityId: number,
) => {
  return await fetch(`${backendUrl}/boarding-fac/${facilityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPets = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/pet/owner/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPetById = async (token: string, petId: number) => {
  return await fetch(`${backendUrl}/pet/id/${petId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPet = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/pet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deletePet = async (token: string, petId: number) => {
  return await fetch(`${backendUrl}/pet/${petId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Trust Fund Info Services
export const getTrustFundInfo = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/trust/fund/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTrustFundInfo = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/trust/fund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateTrustFundInfo = async (
  token: string,
  ownerId: number,
  data: any,
) => {
  return await fetch(`${backendUrl}/trust/fund/${ownerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// Trustee Services
export const getTrustees = async (token: string, trustFundId: number) => {
  return await fetch(`${backendUrl}/trust/trustees/fund/${trustFundId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTrustee = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/trust/trustees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateTrustee = async (
  token: string,
  trusteeId: number,
  data: any,
) => {
  return await fetch(`${backendUrl}/trust/trustees/${trusteeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteTrustee = async (token: string, trusteeId: number) => {
  return await fetch(`${backendUrl}/trust/trustees/${trusteeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVets = async (token: string, ownerId: number) => {
  return await fetch(`${backendUrl}/vet/owner/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createVets = async (token: string, data: any) => {
  return await fetch(`${backendUrl}/vet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteVets = async (token: string, contactId: number) => {
  return await fetch(`${backendUrl}/vet/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVets = async (token: string, id: number, data: any) => {
  return await fetch(`${backendUrl}/vet/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateCaregiver = async (token: string, id: number, data: any) => {
  return await fetch(`${backendUrl}/caregiver/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateBoardingFacility = async (
  token: string,
  id: number,
  data: any,
) => {
  return await fetch(`${backendUrl}/boarding-fac/id/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateEmergencyContact = async (
  token: string,
  id: number,
  data: any,
) => {
  return await fetch(`${backendUrl}/emergency-contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
