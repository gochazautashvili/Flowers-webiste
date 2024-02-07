import React from 'react'
import './Cart.scss'
import Cart_exit from '../../assets/icons/exitMenu__icon.png'
import useCart from '../../hooks/useCart'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import CartItem from '../cartItem/CartItem'
import API from '../../api/api'

function Cart({ handleCart }) {
    const { cart, deleteFromCart } = useCart()
    const { user } = useAuth()

    const handleDeleteCart = (_id) => {
        axios.post(`${API}/cart/delete`, { _id }, {
            headers: { 'Authorization': `Bearer ${user?.token}` }
        })
            .then((res) => {
                deleteFromCart(res.data._id)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handlePayment = () => {
        fetch(`${API}/cart/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify({
                items: cart
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(err => {
            console.error(err.error);
        })
    }

    return (
        <section className='cart__wrapper'>
            <div className="cart">
                <div className="cart__top">
                    <h1>კალათა</h1>
                    <img src={Cart_exit} alt="" onClick={handleCart} />
                </div>
                <div className="cart__product">
                    {cart?.map(item => (
                        <CartItem key={item?._id} item={item} handleDeleteCart={handleDeleteCart} />
                    ))}
                </div>
                <button onClick={handlePayment} className="cart__checkout">შეძენა</button>
            </div>
        </section>
    )
}

export default Cart