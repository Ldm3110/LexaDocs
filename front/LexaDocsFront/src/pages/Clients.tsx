// import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
// import { useEffect } from "react";

export function Clients() {
  const { checkAuth } = useAuth();

  checkAuth();

  return (
    <>
      <h2 className="text-center">Clients</h2>
    </>
  );
}

export default Clients;
