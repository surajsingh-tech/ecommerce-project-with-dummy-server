import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";

export default function CategoriSlider({ title, data }) {
  const key =
    title === "Maincategory"
      ? "maincategory"
      : title === "Subcategory"
        ? "subcategory"
        : null;

  let productStateData = useSelector((state) => state.ProductStateData);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const getSlideFun = () => {
    if (window.innerWidth < 560) return 1;
    if (window.innerWidth < 768) return 2;
    else return 3;
  };

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
      {/*start cartegory slider*/}
      <section className="cartegory-slider section-padding bg-section-2">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">Top {title}</h3>
            <p className="mb-0 text-capitalize">
              Select your favorite categories and purchase
            </p>
          </div>
          <Swiper {...swip}>
            {data &&
              data.map((item, indx) => {
                return (
                  <SwiperSlide key={item.id || indx}>
                    <div className="cartegory-box">
                      <div className="card">
                        <div className="card-body">
                          <div className="overflow-hidden">
                            <Link
                              to={`shop/${title}/${encodeURIComponent(item.name)}`}
                            >
                              <img
                                height={400}
                                src={
                                  item.pic
                                    ? `${import.meta.env.VITE_SITE_SERVER}/${title}/${item.pic}`
                                    : "assets/images/categories/01.webp"
                                }
                                className="card-img-top rounded-0"
                                alt="..."
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h5 className="mb-1 cartegory-name mt-3 fw-bold">
                              {item.name}
                            </h5>
                            <h6 className="mb-0 product-number fw-bold">
                              {productStateData?.filter(
                                (x) => x.active && x[key] === item.name,
                              ).length || 0}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
      {/*end cartegory slider*/}
    </>
  );
}
