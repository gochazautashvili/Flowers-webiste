import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import API from '../api/api'

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            axios.get(`${API}/cart`, {
                headers: { 'Authorization': `Bearer ${user?.token}` }
            }).then((res) => {
                setCart(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [user])

    const addCart = (data, quantity) => {
        const itemInCart = cart.filter(item => item.productID == data.productID)

        if (itemInCart.length > 0) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.productID === data.productID ? { ...item, quantity: item.quantity + quantity } : item
                )
            );
        } else {
            setCart([...cart, data])
        }
    }

    const deleteFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    }

    function getTotalItemsInCart() {
        try {
            return cart.reduce((total, item) => total + item.quantity, 0);
        } catch (error) {
            console.error("Error calculating total items in cart:", error);
            return 0;
        }
    }

    const CartValue = {
        addCart,
        deleteFromCart,
        cart,
        getTotalItemsInCart
    }

    return (
        <CartContext.Provider value={CartValue}>{children}</CartContext.Provider>
    )
}