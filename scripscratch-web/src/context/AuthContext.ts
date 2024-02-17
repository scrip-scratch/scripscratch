import { createContext } from "react";
import { LoginRequest } from "../api/AuthApi";

export enum Role {
  Master = "Master",
  Admin = "Administrator",
  User = "User",
}

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
  login: (params: LoginRequest) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
  login: () => Promise.resolve(),
});
