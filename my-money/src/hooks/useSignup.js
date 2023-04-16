import { projectAuth } from "../firebase/config"
import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        try {
            setIsPending(true)
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!response) {
                throw new Error('Could not complete signup')
            }

            await response.user.updateProfile({ displayName: displayName })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user })

            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
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

    return { error, isPending, signup }
}