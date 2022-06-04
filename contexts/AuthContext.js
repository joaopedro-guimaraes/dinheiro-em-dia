import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { signInRequest, recoverUserInfo } from "../services/auth";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "dinheiro-em-dia.token": token } = parseCookies();

    if (token) recoverUserInfo().then(response => setUser(response.user));
  }, []);

  async function signIn({ email, password }) {
    const { token, user } = await signInRequest({ email, password });

    setCookie(undefined, "dinheiro-em-dia.token", token, {
      maxAge: 60 * 60 * 24, // 1 day
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
