import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import Image from "../image/Image";

function Product({ title, price, main_image, id }) {
  const navigate = useNavigate();

  const handleSinglePage = () => {
    navigate(`/single-product/${id}`);
  };

  return (
    <section className="product" onClick={handleSinglePage}>
      <div className="product__top">
        <p>{title}</p>
        <p>₾ {price}</p>
      </div>
      <Image mainImg={main_image} title={title} width={300} height={350} />
      <div className="product__bottom">
        <button>ნახვა</button>
        <button>შეძენა</button>
      </div>
    </section>
  );
}

export default Product;
