import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout =  () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await projectAuth.signOut()

            //dispatch
            dispatch({ type: 'LOGOUT' })

            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch(err) {
            if(!isCancelled) {
                setError(err.message)
                console.log(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(false)
    }, [])

    return { logout, error, isPending }
}