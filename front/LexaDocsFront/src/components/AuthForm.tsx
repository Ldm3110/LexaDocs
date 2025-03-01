import { useState, useRef } from "react"
import { useFetch } from "../hooks/useFetch"
import { NavigateFunction, useNavigate } from "react-router-dom"

import { Input } from "./Input";

export function AuthForm() {

  const [errorMessage, setErrorMessage] = useState<string>("")
  const navigate: NavigateFunction = useNavigate()
  const { fetch } = useFetch(
    'authentication',
    'GET'
  )
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [submitButtonEnable, setButtonSubmitEnable] = useState(false)

  var username: string = ""
  var password: string = ""

  const validateForm = (): void => {
    username = usernameRef.current?.value.trim();
    password = passwordRef.current?.value.trim();
    setButtonSubmitEnable(!!username && !!password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isAuthenticated = fetch({ username, password })

    if (isAuthenticated) {
      navigate("/dashboard/")
    } else {
      setErrorMessage("Identifiant et/ou mot de passe incorrects. Veuillez réessayer")
    }
  }

  return (
    <>
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
        <Input label={"Nom d'utilisateur ou Email"} type="text" inputRef={usernameRef} onInput={validateForm} />
        <Input label={"Mot de passe"} type="password" inputRef={passwordRef} onInput={validateForm} />

        {errorMessage && <div className="text-danger text-center mt-2">{errorMessage}</div>}

        <button type="submit" className="mt-3 btn btn-success" disabled={!submitButtonEnable}>Se connecter</button>
      </form>
    </>
  )
}