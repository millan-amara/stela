import { useEffect, useState, useRef } from 'react'
import axios from 'axios';


function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        if(isMounted) {
            axios.get('/logged-in')
            .then((response) => {
                if(response.data !== '') {
                    setLoggedIn(true)
                    if(response.data.isAdmin === true) {
                        setIsAdmin(true)
                    }
                }
                setCheckingStatus(false)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])



  return (
    {loggedIn, isAdmin, checkingStatus}
  )
}

export default useAuthStatus