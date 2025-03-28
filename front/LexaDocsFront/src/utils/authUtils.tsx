import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface DecodedToken {
  exp?: number;
}

type isTokenExpiredType = {
  access_token: string;
};

export const isTokenExpired = ({ access_token }: isTokenExpiredType) => {
  try {
    const decodedToken: DecodedToken = jwtDecode(access_token);
    return (
      decodedToken.exp !== undefined && decodedToken.exp < Date.now() / 1000
    );
  } catch (err) {
    return true; // Token is invalid or expired
  }
};

export const setAuthUser = ({ access_token }: isTokenExpiredType) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });
};
