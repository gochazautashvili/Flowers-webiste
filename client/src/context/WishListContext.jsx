import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import API from '../api/api'

export const WishlistContext = createContext(null)

export const WishlistContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            axios.get(`${API}/wishlist`, {
                headers: { 'Authorization': `Bearer ${user?.token}` }
            }).then((res) => {
                setWishlist(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [user])

    const addToWishlist = (data) => {
        setWishlist([...wishlist, data])
    }

    const removeWishlist = (id) => {
        const updatedWishlist = wishlist.filter(item => item.productID !== id);

        setWishlist(updatedWishlist);
    }

    const WishlistValue = {
        addToWishlist,
        removeWishlist,
        wishlist
    }

    return (
        <WishlistContext.Provider value={WishlistValue}>{children}</WishlistContext.Provider>
    )
}