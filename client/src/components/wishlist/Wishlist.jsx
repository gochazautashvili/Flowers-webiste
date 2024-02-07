import React from 'react'
import './Wishlist.scss'
import Cart_exit from '../../assets/icons/exitMenu__icon.png'
import useWishlist from '../../hooks/useWishlist'
import { Link } from 'react-router-dom'

function Wishlist({ handleWishlist }) {
  const { wishlist } = useWishlist()

  return (
    <section className='wishlist__wrapper'>
      <div className="wishlist">
        <div className="wishlist__top">
          <h1>თქვენი საუკეთესოები</h1>
          <img src={Cart_exit} alt="" onClick={handleWishlist} />
        </div>
        <div className="wishlist__product">
          {wishlist.map(item => (
            <Link to={`/single-product/${item.productID}`} key={item._id} className="wishlist__product_box">
              <div className="wishlist__product_box_left">
                <img src={`http://localhost:8000/images/${item.mainImg}`} alt="" />
                <div className="wishlist__product_box_desc">
                  <h1>სახელი: <span>{item.title}</span></h1>
                  <p>ფასი: <span>{item.new_price} $</span></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Wishlist