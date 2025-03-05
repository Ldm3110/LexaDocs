import { useState, useRef } from "react"
// import { NavigateFunction, useNavigate } from "react-router-dom"

import { Input } from "./Input";
// import { useAuth } from "../hooks/useAuth";

type AuthFormType = {
    type: string;
}

export function AuthForm({ type }: AuthFormType) {

    console.log(type)

    const typeLabel = (type === 'staff' ? "Nom d'utilisateur" : "Email")
    const [errorMessage, setErrorMessage] = useState<string>("")
    // const navigate: NavigateFunction = useNavigate()

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

        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        // login(formData)

        console.log("data -- " + data)
        console.log("errors -- " + errors)
        // if (isAuthenticated) {
        //   navigate("/dashboard/")
        // } else {
        //   setErrorMessage("Identifiant et/ou mot de passe incorrects. Veuillez réessayer")
        // }
    }

    return (
        <>
            <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                <Input label={typeLabel} type="text" inputRef={usernameRef} onInput={validateForm} />
                <Input label={"Mot de passe"} type="password" inputRef={passwordRef} onInput={validateForm} />

                {errorMessage && <div className="text-danger text-center mt-2">{errorMessage}</div>}

                <button type="submit" className="mt-5 btn btn-success" disabled={!submitButtonEnable}>Se connecter</button>
            </form>
        </>
    )
}