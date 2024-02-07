import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
    const { addCart, deleteFromCart, cart, getTotalItemsInCart } = useContext(CartContext)

    return {
        addCart,
        deleteFromCart,
        cart,
        getTotalItemsInCart
    }
}

export default useCart