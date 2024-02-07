import { useContext } from "react";
import { WishlistContext } from "../context/WishListContext";

const useWishlist = () => {
    const { addToWishlist, wishlist, removeWishlist } = useContext(WishlistContext)

    return {
        addToWishlist,
        removeWishlist,
        wishlist
    }
}

export default useWishlist