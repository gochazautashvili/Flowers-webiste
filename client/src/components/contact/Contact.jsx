import React, { useRef, useState } from 'react'
import './Contact.scss'
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef();
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    })

    const sendEmail = (e) => {
        e.preventDefault();
        if (formState.firstName !== "" && formState.lastName !== "" && formState.email !== "" && formState.message !== "") {
            emailjs.sendForm("service_mvh332c", "template_wxyfdzy", form.current, "0KjncsKsrvXO2MQop")
                .then((result) => {
                    alert('წარმატებით გაიგზავნა')
                    console.log(result.text);
                    location.reload()
                }, (error) => {
                    alert("რაღაც პრობლემაა მოგვიანებით სცადეთ")
                    console.log(error.text);
                });
        } else {
            alert ("შეიყვანეთ მონაცემები")
        }
    };

    return (
        <section className='contact'>
            <div className="container">
                <form onSubmit={sendEmail} ref={form} className='contact__inner'>
                    <h1>დაგვიკავშირდით</h1>
                    <div className="contact__user">
                        <div className="contact__form_box">
                            <label htmlFor="firstName">სახელი</label>
                            <input onChange={(e) => setFormState({ ...formState, firstName: e.target.value })} name='name' type="text" id='firstName' placeholder='შეიყვანეთ თქვენი სახელი' />
                        </div>
                        <div className="contact__form_box">
                            <label htmlFor="lastName">გვარი</label>
                            <input onChange={(e) => setFormState({ ...formState, lastName: e.target.value })} type="text" id='lastName' placeholder='შეიყვანეთ თქვენი გვარი' />
                        </div>
                    </div>
                    <div className="contact__form_box">
                        <label htmlFor="email">მაილი</label>
                        <input onChange={(e) => setFormState({ ...formState, email: e.target.value })} name='email' type="email" id='email' placeholder='შეიყვანეთ თქვენი მაილი' />
                    </div>
                    <div className="contact__form_box">
                        <label htmlFor="text">მოგვწერეთ</label>
                        <textarea onChange={(e) => setFormState({ ...formState, message: e.target.value })} name='message' className='contact__form_box_textarea' id="text" cols="30" rows="10" placeholder='მოგვწერეთ თქვენი სურვილები'></textarea>
                    </div>
                    <button type='submit'>Contact</button>
                </form>
            </div>
        </section>
    )
}

export default Contact