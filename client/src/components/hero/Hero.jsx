import React from 'react'
import './Hero.scss'
import { NavLink } from 'react-router-dom'

function Hero() {
    return (
        <section className='hero'>
            <div className="container">
                <div className="hero__inner">
                    <div className="hero__left left">
                        <p>valentine gift</p>
                        <h1>Fresh Your Mind <br /> & Feeling love</h1>
                        <NavLink to={'/flowers'}>Shop now</NavLink>
                    </div>
                    <div className="hero__left right">
                        <p>ვალენტინობის საჩუქარი</p>
                        <h1>განაახლეთ თქვენი გონება <br /> & იგრზენით სიყვარული</h1>
                        <NavLink to={'/flowers'}>შეიძინეთ ახლავე</NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero