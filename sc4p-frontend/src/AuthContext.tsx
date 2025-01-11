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
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface AuthContextData {
  currentUser: User | null;
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
    home_phone: string,
    cell_phone: string,
    work_phone: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => User | null;
  forgotPassword: (email: string) => Promise<void>;
  confirmReset: (code: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  async function login(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    // Step 1: Authenticate the user with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Step 2: (Optional) Fetch the user data from the SQL database for additional info if needed
    const response = await fetch(
      `${backendUrl}/user/email/${userCredential.user.email}`,
    );
    if (!response.ok) {
      throw new Error("Failed to retrieve user data from the SQL database");
    }
    const userData = await response.json();

    // Return the user credential, as Firebase is the source of truth for authentication
    return userData;
  }

  async function registerUser(
    name: string,
    email: string,
    password: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    home_phone: string,
    cell_phone: string,
    work_phone: string,
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
    await fetch(`${backendUrl}/user`, {
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
  }

  async function logout(): Promise<void> {
    return await signOut(auth);
  }

  function getUser(): User | null {
    return currentUser;
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
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login,
    registerUser,
    logout,
    getUser,
    forgotPassword,
    confirmReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
