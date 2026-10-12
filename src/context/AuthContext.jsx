import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextValue";
const USERS_KEY = "shopease-users";
const SESSION_KEY = "shopease-session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      return;
    }
  }, [user]);

  function signup({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    let users;

    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      users = [];
    }

    if (!Array.isArray(users)) {
      users = [];
    }

    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail
    };

    const updatedUsers = [
      ...users,
      {
        ...newUser,
        password
      }
    ];

    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    } catch {
      throw new Error("Unable to save your account in this browser.");
    }

    setUser(newUser);

    return newUser;
  }

  function login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    let users;

    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      users = [];
    }

    if (!Array.isArray(users)) {
      users = [];
    }

    const foundUser = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!foundUser) {
      throw new Error("Incorrect email or password.");
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };

    setUser(loggedInUser);

    return loggedInUser;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}