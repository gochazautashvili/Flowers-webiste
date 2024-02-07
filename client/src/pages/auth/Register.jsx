import React, { useState } from 'react'
import './Auth.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/api'

function Register() {
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const UserSchema = yup.object().shape({
        Name: yup.string().required("სახელი აუცილებელია").min(2),
        Password: yup.string().required("პაროლი აუცილებელია იყოს 3ზე მეტი მახიმუმ 40").min(3).max(40)
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(UserSchema)
    })

    const handleRegister = (data) => {
        axios.post(`${API}/auth/register/v1`, { name: data.Name, password: data.Password })
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {
                setError(err?.response?.data)
            })
    }

    return (
        <div className="container">
            <form className='form' onSubmit={handleSubmit(handleRegister)}>
                <h1 className="form__title">შექმენით აქაუნთი</h1>
                {error && <p className='error'>{error}</p>}
                <div className="form__box">
                    <label htmlFor="name">სახელი</label>
                    <input type="text" id='name' name='Name' placeholder='შეიყვანეთ სახელი' {...register('Name')} />
                </div>
                {errors && <p className='error'>{errors.Name?.message}</p>}
                <div className="form__box">
                    <label htmlFor="password">პაროლი</label>
                    <input type="password" id='password' name='Password' placeholder='შეიყვანეთ პაროლი' {...register("Password")} />
                </div>
                <p className='or'>თუ უკვე გაქვთ აქაუნტი <Link to={'/login'}>Login</Link> </p>
                {errors && <p className='error'>{errors.Password?.message}</p>}
                <button className='form__button' type='submit'>დასტური</button>
            </form>
        </div>
    )
}

export default Register