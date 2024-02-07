import React, { useState } from 'react'
import './Auth.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/api'

function Login() {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const UserSchema = yup.object().shape({
        Name: yup.string().required("სახელი აუცილებელია").min(2),
        Password: yup.string().required("პაროლი აუცილებელია იყოს 3ზე მეტი მახიმუმ 40").min(3).max(40)
    })

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(UserSchema)
    })

    const handleRegister = (data) => {
        axios.post(`${API}/auth/login`, { name: data.Name, password: data.Password })
            .then((res) => {
                login(res.data)
                navigate("/")
            })
            .catch((err) => { setError(err?.response?.data) })
    }

    return (
        <div className="container">
            <form className='form' onSubmit={handleSubmit(handleRegister)}>
                <h1 className="form__title">გამოიყენეთ უკვე არსებული აქაუნთი</h1>
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
                <p className='or'>თუ არ გაქვთ აქაუნთი <Link to={'/register'}>Register</Link> </p>
                {errors && <p className='error'>{errors.Password?.message}</p>}
                <button className='form__button' type='submit'>დასტური</button>
            </form>
        </div>
    )
}

export default Login