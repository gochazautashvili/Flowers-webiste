import React from "react";
import "./Blogs__desc.scss";
import Blogs__desc_img from "../../assets/images/blog__img.jpg";
import Button from "../button/Button";

function Blogs__desc() {
  return (
    <section className="blogs__desc">
      <div className="container">
        <div className="blogs__desc_inner">
          <div className="blogs__desc_top">
            <h1>- Blogs -</h1>
            <Button params={"about"} text={"View"} />
          </div>
          <div className="blogs__desc_content">
            <div className="blogs__desc_left">
              <img loading="lazy" src={Blogs__desc_img} alt="" />
            </div>
            <div className="blogs__desc_right">
              <div>
                <h1 className="blogs__desc_right_title">
                  საზოგადოებრივი ინფორმაცია ყვავილებზე
                </h1>
                <p className="blogs__desc_right_text">
                  ამ გვერზე შეძლებთ ნახოთ სხვადასხვა ყვავილის ინფორმაცია რომელის
                  გამოქვეყნებულია ხალხის მიერ რომლებსაც ძალიან უყვართ მათი
                  ყვავილები და ყოველ დღე აკვირდებიან მათ, დაკვირვების შედეგად
                  მიღებულ ინფორმაციას და გამოცდილებას გიზიარებენ თქვენ იმისთვის
                  რომ ყვავილთან ურთიერთობა და მათი მოვლა გაგიმარტივდეთ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs__desc;
