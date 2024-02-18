import React, { useState } from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Cart__icon from "../../assets/icons/shopping__cart.png";
import Profile__icon from "../../assets/icons/profile.png";
import Wishlist__icon from "../../assets/icons/wishlist.png";
import BurgerMenu__icon from "../../assets/icons/burgerMenu__icon.png";
import MobileMenu from "../mobileMenu/MobileMenu";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

function Header() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { wishlist: wishlistLength } = useWishlist();
  const { user } = useAuth();
  const { getTotalItemsInCart } = useCart();

  const body = document.querySelector("body");

  document.addEventListener("click", (e) => {
    if (
      e.target.className === "cart__wrapper" ||
      e.target.className === "mobileMenu__wrapper" ||
      e.target.className === "wishlist__wrapper"
    ) {
      body.style.overflow = "visible";
      setCart(false);
      setMobileMenu(false);
      setWishlist(false);
    }
  });

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
    setCart(false);
    setWishlist(false);

    if (mobileMenu) {
      body.style.overflow = "visible";
    } else {
      body.style.overflow = "hidden";
    }
  };

  const handleCart = () => {
    if (user) {
      if (cart) {
        body.style.overflow = "visible";
      } else {
        body.style.overflow = "hidden";
      }
      setCart(!cart);
      setMobileMenu(false);
      setWishlist(false);
    }
  };

  const handleWishlist = () => {
    if (user) {
      if (wishlist) {
        body.style.overflow = "visible";
      } else {
        body.style.overflow = "hidden";
      }

      setWishlist(!wishlist);
      setCart(false);
      setMobileMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <NavLink to={"/"}>
              SOPHIE'S <span>FLOWERS</span>
            </NavLink>
          </div>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink to={"/"} className="menu__link">
                  HOME
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to={"/flowers"} className="menu__link">
                  FLOWERS
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to={"/about"} className="menu__link">
                  ABOUT US
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="header__right">
            <div>
              <img
                loading="lazy"
                onClick={() => navigate("/profile")}
                src={Profile__icon}
                alt=""
              />
            </div>
            <div className="header__right_box" onClick={handleWishlist}>
              <img loading="lazy" src={Wishlist__icon} alt="" />
              <span>{wishlistLength.length}</span>
            </div>
            <div className="header__right_box" onClick={handleCart}>
              <img loading="lazy" src={Cart__icon} alt="" />
              <span>{getTotalItemsInCart()}</span>
            </div>
          </div>
          <div className="header__burger_menu">
            <img
              loading="lazy"
              className="burger"
              onClick={handleMenu}
              src={BurgerMenu__icon}
              alt=""
            />
          </div>
        </div>
      </div>
      {mobileMenu && (
        <MobileMenu handleCart={handleCart} handleWishlist={handleWishlist} />
      )}
      {cart && <Cart handleCart={handleCart} />}
      {wishlist && <Wishlist handleWishlist={handleWishlist} />}
    </header>
  );
}

export default Header;
