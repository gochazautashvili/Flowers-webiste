import React from 'react'
import { Link } from 'react-router-dom'

function AuthFalse() {
    return (
        <section className='authFalse'>
            <h1>თქვენ უნდა დარეგისტრირდეთ</h1>
            <Link to='/register'>დარეგისტრირდით ახლავე</Link>
        </section>
    )
}

export default AuthFalse