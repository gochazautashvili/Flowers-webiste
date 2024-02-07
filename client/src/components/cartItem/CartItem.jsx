import React from 'react'
import '../cart/Cart.scss'
import { Link } from 'react-router-dom'

function CartItem({ item, handleDeleteCart }) {
    return (
        <div className="cart__product_box">
            <Link to={`/single-product/${item.productID}`} className="cart__product_box_left">
                <div className="cart__product_box_left_img">
                    <img src={`http://localhost:8000/images/${item.mainImg}`} alt="" />
                    <h1>{item.quantity}</h1>
                </div>
                <div className="cart__product_box_desc">
                    <h1>სახელი: <span>{item?.title}</span></h1>
                    <p>ფასი: <span>{item?.new_price} $</span></p>
                </div>
            </Link>
            <button className='cart__product_box_button' onClick={() => handleDeleteCart(item._id)}>ამოშლა</button>
        </div>
    )
}

export default CartItem