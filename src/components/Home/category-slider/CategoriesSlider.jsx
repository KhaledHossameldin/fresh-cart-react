import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { categoriesUrl } from "../../../data/constants/network";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../../../data/constants/colors";
import Slider from "react-slick";

import styles from "./CategoriesSlider.module.css";

function CategoriesSlider() {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("categories", () => axios.get(categoriesUrl));

  if (isLoading) {
    return (
      <section className="text-center my-5">
        <FallingLines
          color={mainColor}
          width="50"
          ariaLabel="falling-lines-loading"
        />
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <p className="text-danger my-5 text-center fw-bold">
          <i class="fa-solid fa-triangle-exclamation me-1"></i>
          {error.response.data.message}
        </p>
      </section>
    );
  }
  return (
    <section className="my-5 overflow-hidden">
      <Slider slidesPerRow={5} draggable={false} autoplay>
        {response.data.data.map((category, index) => (
          <div key={index}>
            <img
              src={category.image}
              alt=""
              className={styles["category-image"]}
            />
            <h3 className="fw-bold text-center">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default CategoriesSlider;
