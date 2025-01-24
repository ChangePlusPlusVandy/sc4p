import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useContext, useState, useEffect, createContext } from "react";
import auth from "./firebase";
import type { UserCredential, User } from "firebase/auth";
import { UserType } from "./types/user";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface AuthContextData {
  currentUser: User | null;
  userData: UserType | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    home_phone?: string,
    cell_phone?: string,
    work_phone?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => User | null;
  getUserData: () => UserType | null;
  forgotPassword: (email: string) => Promise<void>;
  confirmReset: (code: string, password: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to fetch user data from SQL database
  const fetchUserData = async (email: string) => {
    try {
      const response = await fetch(`${backendUrl}/user/email/${email}`);
      if (!response.ok) {
        throw new Error("Failed to retrieve user data from the SQL database");
      }
      const data = await response.json();
      setUserData(data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  async function refreshUserData(): Promise<void> {
    if (currentUser?.email) {
      await fetchUserData(currentUser.email);
    }
  }

  async function login(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await fetchUserData(email);
    return userCredential;
  }

  async function registerUser(
    name: string,
    email: string,
    password: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    home_phone?: string,
    cell_phone?: string,
    work_phone?: string,
  ): Promise<void> {
    // Step 1: Create the user in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Step 2: Update the user's profile in Firebase with the display name
    await updateProfile(userCredential.user, { displayName: name });

    // Step 3: Save user data in the SQL database with additional fields
    const response = await fetch(`${backendUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        city,
        state,
        zip,
        home_phone,
        cell_phone,
        work_phone,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      setUserData(userData);
    }
  }

  async function logout(): Promise<void> {
    setUserData(null);
    return await signOut(auth);
  }

  function getUser(): User | null {
    return currentUser;
  }

  function getUserData(): UserType | null {
    return userData;
  }

  async function forgotPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email);
  }

  async function confirmReset(code: string, password: string): Promise<void> {
    return await confirmPasswordReset(auth, code, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Get the ID token with fresh claims
        const token = await user.getIdTokenResult(true);
        setIsAdmin(!!token.claims.admin);
        // Fetch user data when auth state changes
        await fetchUserData(user.email!);
      } else {
        setIsAdmin(false);
        setUserData(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin,
    login,
    registerUser,
    logout,
    getUser,
    getUserData,
    forgotPassword,
    confirmReset,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
