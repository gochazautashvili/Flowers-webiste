import React from "react";
import About__desc_img from "../../assets/images/about__img.jpg";
import Button from "../button/Button";
import "./About__desc.scss";
import { About__text } from "../../product/text";
import { useMediaQuery } from "react-responsive";

function About__desc() {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <section className="about__desc">
      <div className="container">
        <div className="about__desc_inner">
          <div className="about__desc_top">
            <h1>- About us -</h1>
            <Button params={"about"} text={"View"} />
          </div>
          <div className="about__desc_content">
            <div className="about__desc_left">
              <h1>ჩვენი აყვავებული ამბავი</h1>
              <p>{isMobile ? About__text.slice(0, 700) : About__text}</p>
            </div>
            <div className="about__desc_right">
              <img loading="lazy" src={About__desc_img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About__desc;
