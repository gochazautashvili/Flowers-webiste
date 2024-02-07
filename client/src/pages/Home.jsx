import React from 'react'
import './Pages.scss'
import Hero from '../components/hero/Hero'
import Collection from '../components/collection/Collection'
import Blogs__desc from '../components/blogs__desc/Blogs__desc'
import About__desc from '../components/about__desc/About__desc'
import Contact from '../components/contact/Contact'

function Home() {
    return (
        <main className='home main'>
            <Hero />
            <Collection />
            <Blogs__desc />
            <About__desc />
            <Contact />
        </main>
    )
}

export default Home