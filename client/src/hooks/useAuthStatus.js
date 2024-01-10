import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';


function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        if(isMounted) {
            axios.get('/logged-in')
            .then((response) => {
                if(response.data !== '') {
                    setLoggedIn(true)
                    console.log(response.data)   
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
    {loggedIn, checkingStatus}
  )
}

export default useAuthStatus