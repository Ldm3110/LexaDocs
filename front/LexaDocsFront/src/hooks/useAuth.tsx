import { useEffect, useState } from "react";

import { isAuth, logoutUser } from "../api/apiBase";
import { loginCustomer } from "../api/customers";
import { useNavigate } from "react-router-dom";

export enum AuthStatus {
  UNKNOW = "Unknow",
  AUTHENTICATED = "Authenticated",
  EXPIRED = "Expired",
  ERROR_CREDENTIALS = "ErrorCredentials",
}

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === AuthStatus.AUTHENTICATED) {
      localStorage.setItem("status", status);
      localStorage.setItem("user", user);
      localStorage.setItem("role", role);
    }
  }, [status, user]);

  const login = (formData: FormData, type: string) => {
    if (type === "customers") {
      loginCustomer(formData)
        .then((res) => {
          setStatus(AuthStatus.AUTHENTICATED);
          setUser(res.customer_data.name);
          setRole(res.customer_data.role);
        })
        .catch(() => setStatus(AuthStatus.ERROR_CREDENTIALS));
    }
  };

  const checkAuth = () => {
    isAuth().catch(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  const logout = () => {
    logoutUser().then(() => {
      setStatus(AuthStatus.UNKNOW);
    });
  };

  return {
    status,
    user,
    role,
    login,
    checkAuth,
    logout,
  };
}
