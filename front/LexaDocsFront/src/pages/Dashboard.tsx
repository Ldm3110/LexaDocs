// import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const { checkAuth } = useAuth();

  checkAuth();

  return (
    <>
      <h2>Dashboard</h2>
    </>
  );
}

export default Dashboard;
