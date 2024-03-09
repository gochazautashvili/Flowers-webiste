import React, { lazy, useState, Suspense } from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Cart__icon from "../../assets/icons/shopping__cart.webp";
import Profile__icon from "../../assets/icons/profile.webp";
import Wishlist__icon from "../../assets/icons/wishlist.png";
import BurgerMenu__icon from "../../assets/icons/burgerMenu__icon.png";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
const MobileMenu = lazy(() => import("../mobileMenu/MobileMenu"));
const Wishlist = lazy(() => import("../wishlist/Wishlist"));
const Cart = lazy(() => import("../cart/Cart"));

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
                alt="profile"
                width="25"
                height="25"
              />
            </div>
            <div className="header__right_box" onClick={handleWishlist}>
              <img
                loading="lazy"
                src={Wishlist__icon}
                alt="wishlist"
                width="25"
                height="25"
              />
              <span>{wishlistLength.length}</span>
            </div>
            <div className="header__right_box" onClick={handleCart}>
              <img
                loading="lazy"
                src={Cart__icon}
                alt="cart"
                width="25"
                height="25"
              />
              <span>{getTotalItemsInCart()}</span>
            </div>
          </div>
          <div className="header__burger_menu">
            <img
              loading="lazy"
              className="burger"
              onClick={handleMenu}
              src={BurgerMenu__icon}
              alt="menu"
              width="32"
              height="25"
            />
          </div>
        </div>
      </div>
      {mobileMenu && (
        <Suspense fallback="loading...">
          <MobileMenu handleCart={handleCart} handleWishlist={handleWishlist} />
        </Suspense>
      )}
      {cart && (
        <Suspense fallback="loading...">
          <Cart handleCart={handleCart} />
        </Suspense>
      )}
      {wishlist && (
        <Suspense fallback="loading...">
          <Wishlist handleWishlist={handleWishlist} />
        </Suspense>
      )}
    </header>
  );
}

export default Header;
