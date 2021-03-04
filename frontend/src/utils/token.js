import { TOKEN } from "./constants";
import jwtDecode from "jwt-decode";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
  return jwtDecode(token);
}

export function removeToken() {
  return localStorage.removeItem(TOKEN);
}

export function verifyTokenExpiration(token) {
  if (!token) return false;
  const decoded = decodeToken(token);
  if (!decoded.exp) return false;

  if (Date.now() >= decoded.exp * 1000) {
    return false;
  }

  return true;
}
