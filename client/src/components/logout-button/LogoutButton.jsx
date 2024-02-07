import React from 'react'
import useAuth from '../../hooks/useAuth'
import './LogoutButton.scss'

function LogoutButton() {
    const { logout } = useAuth()

    return (
        <button onClick={logout} className='LogoutButton'>Logout</button>
    )
}

export default LogoutButton