import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { ColorRing } from 'react-loader-spinner'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import API from '../api/api'

function SingleProduct() {
    const { id } = useParams()
    const [flower, setFlower] = useState(null)
    const { user } = useAuth()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)
    const { addCart } = useCart()
    const { addToWishlist, wishlist, removeWishlist } = useWishlist()
    const wishlistDisable = wishlist.filter(item => item.productID == id)

    useEffect(() => {
        setLoading(true)
        axios.get(`${API}/product/single_product?productID=${id}`, {
            headers: { 'Authorization': `Bearer ${user?.token}` }
        })
            .then((res) => {
                setFlower(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }, [user, id])

    const formattedPrice = useMemo(() => {
        if (flower) {
            const newPrice = `New: ${flower.new_price} $`;
            const oldPrice = flower.old_price ? `Old: ${flower.old_price} $` : '';
            return [newPrice, oldPrice].filter(Boolean).join(' ');
        }
        return '';
    }, [flower]);

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleQuantity = (e) => {
        setQuantity(Number(e.target.value))
    }

    const addToCart = (flowerProp) => {
        if (quantity > 0) {
            axios.post(`${API}/cart`, { flowerProp, cartUserID: user.userID, productID: flower._id, quantity }, {
                headers: { 'Authorization': `Bearer ${user?.token}` }
            }).then((res) => {
                addCart(res.data, quantity)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const addWishlist = (flowerProp) => {
        axios.post(`${API}/wishlist`, { flowerProp, cartUserID: user.userID, productID: flower._id }, {
            headers: { 'Authorization': `Bearer ${user?.token}` }
        }).then((res) => {
            if (wishlistDisable.length > 0) {
                removeWishlist(id)
            } else {
                addToWishlist(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <main className='singleProduct'>
            <div className="container">
                {loading ? <ColorRing
                    visible={true}
                    height="180"
                    width="180"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /> : <div className="single__inner">
                    <div className="single__left">
                        <img src={`http://localhost:8000/images/${flower?.mainImg}`} alt="" />
                    </div>
                    <div className="single__right">
                        <div className="single__right_top">
                            <h1>{flower?.title}</h1>
                            <hr />
                            <div className="single__right_top_price">
                                <p className='title'>Price:</p>
                                <p className='new'> {formattedPrice} </p>
                            </div>
                        </div>
                        {user && <>
                            <div className="single__right_center">
                                <button onClick={decrement}>-</button>
                                <input type="text" onChange={handleQuantity} value={quantity} />
                                <button onClick={increment}>+</button>
                            </div>
                            <div className="single__right_bottom">
                                <button onClick={() => addWishlist(flower)} className='wishlist'>{wishlistDisable.length > 0 ? "Remove Wishlist" : "Add WishList"}</button>
                                <button onClick={() => addToCart(flower)} className='add_cart'>ADD TO CART</button>
                            </div></>}
                    </div>
                </div>}
            </div>
        </main>
    )
}

export default SingleProduct