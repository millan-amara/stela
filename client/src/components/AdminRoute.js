import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const AdminRoute = () => {
    const { isAdmin, checkingStatus } = useAuthStatus()

    if(checkingStatus) {
        return <Spinner />
    }

    return isAdmin ? <Outlet /> : <Navigate to='/cars' />
}

export default AdminRoute 