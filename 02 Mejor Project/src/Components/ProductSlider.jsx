import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "./ProductCart";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
const getSlideFun = () => {
  if (window.innerWidth < 560) return 2;
  if (window.innerWidth < 768) return 3;
  if (window.innerWidth < 992) return 4;
  else return 5;
};

export default function ProductSlider({ title, data }) {
  let [slideView, setView] = useState(getSlideFun());

  useEffect(() => {
    const handleResize = () => setView(getSlideFun());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let swip = {
    slidesPerView: slideView,
    spaceBetween: 30,
    freeMode: true,
    loop: data.length > slideView,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    modules: [FreeMode, Autoplay, Pagination],
    className: "mySwiper",
  };

  return (
    <>
      {/*start Featured Products slider*/}
      <section className="section-padding">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">{title} Product</h3>
            <p className="mb-0 text-capitalize">Check New Arrivals </p>
          </div>

          <div className="product-thumbs">
            <Swiper {...swip}>
              {data &&
                data.map((item, indx) => {
                  return (
                    <SwiperSlide key={item.id || indx}>
                      <ProductCart item={item} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>
      {/*end Featured Products slider*/}
    </>
  );
}
