import React, { useState } from "react";
import "./Cart.scss";
import Cart_exit from "../../assets/icons/exitMenu__icon.png";
import useCart from "../../hooks/useCart";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CartItem from "../cartItem/CartItem";
import API from "../../api/api";
import CreateLoader from "../loaders/CreateLoader.jsx";

function Cart({ handleCart }) {
  const { cart, deleteFromCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteCart = (_id) => {
    setDeleting(true);
    axios
      .post(
        `${API}/cart/delete`,
        { _id },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setDeleting(false);
        deleteFromCart(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    setLoading(true);
    fetch(`${API}/cart/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        items: cart,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((err) => {
        console.error(err.error);
      });
  };

  return (
    <section className="cart__wrapper">
      <div className="cart">
        <div className="cart__top">
          <h1>კალათა</h1>
          <img loading="lazy" src={Cart_exit} alt="" onClick={handleCart} />
        </div>
        <div className="cart__product">
          {cart?.map((item) => (
            <CartItem
              deleting={deleting}
              key={item?._id}
              item={item}
              handleDeleteCart={handleDeleteCart}
            />
          ))}
        </div>
        <button onClick={handlePayment} className="cart__checkout">
          {loading ? <CreateLoader /> : "შეძენა"}
        </button>
      </div>
    </section>
  );
}

export default Cart;
