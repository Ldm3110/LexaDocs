import React from "react";
import { useNavigate } from "react-router-dom";

const styleContainer: React.CSSProperties = {
  width: "350px",
  height: "250px",
};

export function ChooseAuth() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container flex flex-col justify-center items-center min-h-screen">
        <div className="text-center mb-5">
          <h1>Bienvenue sur Lexadoc</h1>
        </div>
        <div className="flex justify-around mt-5 w-full">
          <div
            className="flex justify-center items-center rounded-xl shadow-lg bg-yellow-100"
            style={styleContainer}
          >
            <div className="container text-center">
              <h4>Accès clients</h4>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md"
                onClick={() => navigate("/auth/customers")}
              >
                Cliquez ici
              </button>
            </div>
          </div>
          <div
            className="flex justify-center items-center rounded-xl shadow-lg bg-green-100"
            style={styleContainer}
          >
            <div className="flex flex-col justify-center items-center">
              <h4>Accès Salarié</h4>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded-xl"
                onClick={() => navigate("/auth/staff")}
              >
                Cliquez ici
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseAuth;
