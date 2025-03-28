import AuthForm from "../components/AuthForm";

type AuthType = {
  type: string;
};

function Auth({ type }: AuthType) {
  const typeLabel = type === "staff" ? "Accès salarié" : "Accés client";

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="text-black text-center p-4 rounded-5 shadow-lg"
          style={{ width: "350px" }}
        >
          <h2>
            <strong>Lexadocs</strong>
          </h2>
          <h5 className="mb-5 fst-italic">{typeLabel}</h5>
          <div className="d-flex flex-column mb-3">
            <AuthForm type={type} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
