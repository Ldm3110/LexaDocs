import { create } from "zustand";
import Cookies from "js-cookie";

import { isTokenExpired, setAuthUser } from "../utils/authUtils";
import { api } from "../api/apiBase";

export enum AuthStatus {
  UNKNOW = "Unknow",
  AUTHENTICATED = "Authenticated",
  EXPIRED = "Expired",
  ERROR_CREDENTIALS = "ErrorCredentials",
}

export const useAuthStore = create(() => ({
  user: { id: "", name: "", role: "" },
  status: AuthStatus.UNKNOW,
}));

// export const updateUser = (username: string) => {
//   useAuthStore.setState({ username: username });
// };

export const login = async (formData: FormData, type: string) => {
  var route: string = "";
  if (type === "customers") {
    route = "authentication/customers";
  } else if (type === "staff") {
    route = "authentication/staff";
  }
  try {
    const response = await api.post(route, formData);
    const { id, name, role } = response.data.customer_data;
    useAuthStore.setState({
      user: { id, name, role },
      status: AuthStatus.AUTHENTICATED,
    });
  } catch (e) {
    useAuthStore.setState({
      status: AuthStatus.ERROR_CREDENTIALS,
    });
  }
};

export const logout = async () => {
  await api.post("logout");
  useAuthStore.setState({ status: AuthStatus.UNKNOW });
};

export const isAuth = () => {
  const token: string | undefined = Cookies.get("access_token");
  if (!token) {
    logout();
  }
  if (isTokenExpired({ access_token: token })) {
    try {
      setAuthUser({ access_token: token });
    } catch (e) {
      console.log(e);
      logout();
    }
  }
};
