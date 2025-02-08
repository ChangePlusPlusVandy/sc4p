import axios from "axios";
import { User } from "firebase/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Admin {
  uid: string;
  email: string;
  displayName: string | null;
}

export class AdminService {
  private static async getAuthHeader(currentUser: User | null) {
    const token = await currentUser?.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static async getAllAdmins(currentUser: User | null): Promise<Admin[]> {
    try {
      const headers = await this.getAuthHeader(currentUser);
      const response = await axios.get(`${backendUrl}/admin`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching admins:", error);
      throw new Error("Failed to fetch admins");
    }
  }

  static async getUserByEmail(
    email: string,
    currentUser: User | null,
  ): Promise<Admin> {
    try {
      const headers = await this.getAuthHeader(currentUser);
      const response = await axios.get(`${backendUrl}/user/email/${email}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("User not found");
    }
  }

  static async addAdmin(uid: string, currentUser: User | null): Promise<void> {
    try {
      const headers = await this.getAuthHeader(currentUser);
      await axios.post(`${backendUrl}/admin/${uid}`, {}, { headers });
    } catch (error) {
      console.error("Error adding admin:", error);
      throw new Error("Failed to add admin");
    }
  }

  static async removeAdmin(
    uid: string,
    currentUser: User | null,
  ): Promise<void> {
    try {
      const headers = await this.getAuthHeader(currentUser);
      await axios.delete(`${backendUrl}/admin/${uid}`, { headers });
    } catch (error) {
      console.error("Error removing admin:", error);
      throw new Error("Failed to remove admin");
    }
  }
}
