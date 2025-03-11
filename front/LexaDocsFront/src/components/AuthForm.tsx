import { useState, useRef, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { Input } from "./Input";
import { useAuth, AuthStatus } from "../hooks/useAuth";

type AuthFormType = {
  type: string;
};

export function AuthForm({ type }: AuthFormType) {
  const typeLabel: string = type === "staff" ? "Nom d'utilisateur" : "Email";
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [submitButtonEnable, setButtonSubmitEnable] = useState(false);

  const { status, login } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.AUTHENTICATED) {
      navigate("/dashboard");
    } else if (status === AuthStatus.ERROR_CREDENTIALS) {
      setErrorMessage("Vos identifiants sont erronés ! Veuillez réessayer");
    }
  }, [status]);

  var username: string = "";
  var password: string = "";
  const enableButton = (): void => {
    username = usernameRef.current?.value?.trim();
    password = passwordRef.current?.value?.trim();
    setButtonSubmitEnable(!!username && !!password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    login(formData, type);
  };

  return (
    <>
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
        <Input
          label={typeLabel}
          type="text"
          inputRef={usernameRef}
          onInput={enableButton}
        />
        <Input
          label={"Mot de passe"}
          type="password"
          inputRef={passwordRef}
          onInput={enableButton}
        />

        {errorMessage && (
          <div className="text-danger text-center fst-italic mt-2">
            <strong>{errorMessage}</strong>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 btn btn-success"
          disabled={!submitButtonEnable}
        >
          Se connecter
        </button>
      </form>
    </>
  );
}
