import React from "react";
import "./Wishlist.scss";
import Cart_exit from "../../assets/icons/exitMenu__icon.png";
import useWishlist from "../../hooks/useWishlist";
import { Link } from "react-router-dom";
import Image from "../image/Image";

function Wishlist({ handleWishlist }) {
  const { wishlist } = useWishlist();

  return (
    <section className="wishlist__wrapper">
      <div className="wishlist">
        <div className="wishlist__top">
          <h1>თქვენი საუკეთესოები</h1>
          <img loading="lazy" src={Cart_exit} alt="" onClick={handleWishlist} />
        </div>
        <div className="wishlist__product">
          {wishlist.map((item) => (
            <Link
              to={`/single-product/${item.productID}`}
              key={item._id}
              className="wishlist__product_box"
            >
              <div className="wishlist__product_box_left">
                <Image mainImg={item.mainImg} title={item.title} width={100} height={100} />
                <div className="wishlist__product_box_desc">
                  <h1>
                    სახელი: <span>{item.title}</span>
                  </h1>
                  <p>
                    ფასი: <span>₾ {item.new_price}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
