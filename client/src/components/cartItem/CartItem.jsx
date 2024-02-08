import React from 'react'
import '../cart/Cart.scss'
import { Link } from 'react-router-dom'
import CreateLoader from '../loaders/CreateLoader.jsx'

function CartItem({ item, handleDeleteCart, deleting }) {
    return (
        <div className="cart__product_box">
            <Link to={`/single-product/${item.productID}`} className="cart__product_box_left">
                <div className="cart__product_box_left_img">
                    <img src={item.mainImg} alt="" />
                    <h1>{item.quantity}</h1>
                </div>
                <div className="cart__product_box_desc">
                    <h1>სახელი: <span>{item?.title}</span></h1>
                    <p>ფასი: <span>{item?.new_price} $</span></p>
                </div>
            </Link>
            <button className='cart__product_box_button' onClick={() => handleDeleteCart(item._id)}>{deleting ? <CreateLoader /> : "ამოშლა"}</button>
        </div>
    )
}

export default CartItem