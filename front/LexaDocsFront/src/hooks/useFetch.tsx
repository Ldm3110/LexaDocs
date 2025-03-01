import { useState } from "react";

import { dataAuth } from '../dataTemp/data'

export function useFetch(url: string, method: string) {
    // const [data, setData] = useState()
    // const [errors, setErrors] = useState()

    const fetch = (body: { username: string; password: string }): boolean => {
        // Implémenter le code du fetch plus tard
        if ((body.username === dataAuth.username || body.username === dataAuth.email) && body.password === dataAuth.password) {
            console.log("connexion ok")
            localStorage.setItem("shortName", dataAuth.shortName)
            return true
        } else {
            console.log("connexion impossible")
            return false
        }
    }

    return {
        // data,
        // errors,
        fetch
    }
}