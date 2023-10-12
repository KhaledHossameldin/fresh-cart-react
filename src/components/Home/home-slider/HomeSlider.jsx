import React from "react";
import Slider from "react-slick";
import {
  groceryBanner1,
  groceryBanner2,
  sliderImage1,
  sliderImage2,
  sliderImage3,
} from "../../../assets/images";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./HomeSlider.module.css";

function HomeSlider() {
  return (
    <section className="row g-0">
      <div className="col-md-8">
        <div>
          <Slider autoplay dots arrows={false}>
            <img src={sliderImage1} alt="" className={styles["slider-image"]} />
            <img src={sliderImage2} alt="" className={styles["slider-image"]} />
            <img src={sliderImage3} alt="" className={styles["slider-image"]} />
          </Slider>
        </div>
      </div>
      <div className="col-md-4">
        <div className="row g-0">
          <div className="col-12">
            <div>
              <img
                src={groceryBanner1}
                alt=""
                className={styles["side-image"]}
              />
            </div>
          </div>
          <div className="col-12">
            <div>
              <img
                src={groceryBanner2}
                alt=""
                className={styles["side-image"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;
