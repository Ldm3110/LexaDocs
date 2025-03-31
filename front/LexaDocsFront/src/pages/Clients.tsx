import { isAuth } from "../hooks/useAuth";

export function Clients() {
  isAuth();
  return (
    <>
      <h2 className="text-center">Clients</h2>
    </>
  );
}

export default Clients;
