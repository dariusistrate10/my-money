import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch the login action
            dispatch({ type: 'LOGIN', payload: response.user })

            // update states
            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch(err) {
            if(!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(false)
    }, [])

    return { login, error, isPending }

}