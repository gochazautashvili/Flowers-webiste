import React from 'react'
import './Button.scss'
import { useNavigate } from 'react-router-dom'

function Button({ text, params }) {
    const navigate = useNavigate()


    const navigatePage = (params, e) => {
        if (params) {
            navigate("/" + params)
        }

        if (!params) {
            e.preventDefault()
        }
    }

    return (
        <button onClick={(e) => navigatePage(params, e)} className='button'>{text}</button>
    )
}

export default Button