import { useEffect } from "react";
import { AuthStatus, isAuth, useAuthStore } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const status = useAuthStore((state) => state.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === AuthStatus.UNKNOW) {
      navigate("/");
    }
  }, [status]);

  isAuth();

  return (
    <>
      <h2>Dashboard</h2>
    </>
  );
}

export default Dashboard;
