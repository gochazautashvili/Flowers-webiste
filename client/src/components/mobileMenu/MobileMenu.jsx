import React from "react";
import "./MobileMenu.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Cart__icon from "../../assets/icons/shopping__cart.webp";
import Profile__icon from "../../assets/icons/profile.webp";
import Wishlist__icon from "../../assets/icons/wishlist.png";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../logout-button/LogoutButton";
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
function MobileMenu({ handleCart, handleWishlist }) {
  const navigate = useNavigate();
  const { wishlist: wishlistLength } = useWishlist();
  const { getTotalItemsInCart } = useCart();

  const { user } = useAuth();

  return (
    <>
      <div className="mobileMenu__wrapper">
        <section className="mobileMenu">
          <div className="mobileMenu__logo">
            <NavLink to={"/"}>
              SOPHIE'S <span>FLOWERS</span>
            </NavLink>
          </div>
          <nav className="mobileMenu__menu">
            <ul className="mobileMenu__menu_list">
              <li className="mobileMenu__menu_item">
                <NavLink to={"/"} className="mobileMenu__menu_link">
                  HOME
                </NavLink>
              </li>
              <li className="mobileMenu__menu_item">
                <NavLink to={"/flowers"} className="mobileMenu__menu_link">
                  FLOWERS
                </NavLink>
              </li>
              <li className="mobileMenu__menu_item">
                <NavLink to={"/about"} className="mobileMenu__menu_link">
                  ABOUT US
                </NavLink>
              </li>
              <li className="mobileMenu__menu_item mobileMenu__menu_logout">
                {user && <LogoutButton />}
              </li>
            </ul>
          </nav>
          <div className="mobileMenu__right">
            <div>
              <img
                loading="lazy"
                onClick={() => navigate("/profile")}
                src={Profile__icon}
                alt=""
              />
            </div>
            <div className="mobileMenu__right_box" onClick={handleWishlist}>
              <img loading="lazy" src={Wishlist__icon} alt="" />
              <span>{wishlistLength.length}</span>
            </div>
            <div className="mobileMenu__right_box" onClick={handleCart}>
              <img loading="lazy" src={Cart__icon} alt="" />
              <span>{getTotalItemsInCart()}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MobileMenu;
