import AuthForm from "../components/AuthForm";

type AuthType = {
  type: string;
};

function Auth({ type }: AuthType) {
  const typeLabel = type === "staff" ? "Accès salarié" : "Accés client";

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div
          className="w-[350px] rounded-xl bg-white p-5 text-center text-black shadow-lg"
          style={{ width: "350px" }}
        >
          <h2 className="text-2xl font-bold">
            <strong>Lexadocs</strong>
          </h2>
          <h5 className="mb-5 text-gray-600 italic">{typeLabel}</h5>
          <div className="mb-3 flex flex-col">
            <AuthForm type={type} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
