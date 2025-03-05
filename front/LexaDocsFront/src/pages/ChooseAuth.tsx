import React from "react"
import { useNavigate } from "react-router-dom"

const styleContainer: React.CSSProperties = {
    width: "350px",
    height: "250px"
}

export function ChooseAuth() {

    const navigate = useNavigate()

    return <>
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="text-center mb-5">
                <h1>Bienvenue sur Lexadoc</h1>
            </div>
            <div className="d-flex justify-content-around mt-5 w-100">
                <div className="d-flex justify-content-center align-items-center rounded-5 shadow-lg bg-warning-subtle" style={styleContainer}>
                    <div className="container text-center">
                        <h4>Accès clients</h4>
                        <button
                            type="submit"
                            className="mt-4 btn btn-success"
                            onClick={() => navigate('/auth/customers',)}
                        >Cliquez ici</button>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center rounded-5 shadow-lg bg-success-subtle" style={styleContainer}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4>Accès Staff</h4>
                        <button
                            type="submit"
                            className="mt-4 btn btn-success"
                            onClick={() => navigate('/auth/staff',)}
                        >Cliquez ici</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ChooseAuth