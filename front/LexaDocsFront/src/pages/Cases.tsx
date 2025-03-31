import { isAuth } from "../hooks/useAuth";

export function Cases() {
  isAuth();
  return (
    <>
      <h2 className="text-center">Cases</h2>
    </>
  );
}

export default Cases;
