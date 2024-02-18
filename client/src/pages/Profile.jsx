import React from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import './Pages.scss'
import LogoutButton from '../components/logout-button/LogoutButton'

function Profile() {
  const { user } = useAuth()

  return (
    <main>
      <div className="container">
        {user ? (
          <div className='profile'>
            <h1>User:  <span>-{user?.name?.toUpperCase()}-</span></h1>
            <Link to='/create-product'>Create Product</Link>
            <LogoutButton />
          </div>
        ) : (<div className='profile__create_account'>
          <p>გაიარეთ რეგისტრაცია მეტი უფლებისთვის</p>
          <div className="profile__create_account_links">
            <Link to={'/register'}>Register</Link> / <Link to={'/login'}>Login</Link>
          </div>
        </div>)}
      </div>
    </main>
  )
}

export default Profile