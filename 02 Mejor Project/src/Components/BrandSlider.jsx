import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function BrandSlider() {
  let brandStateData = useSelector((state) => state.BrandStateData);
  let [brand, setbrand] = useState();

  let dispatch = useDispatch();
  const getSlideFun = () => {
    if (window.innerWidth < 560) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 992) return 4;
    else return 5;
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
    loop: brandStateData.length > slideView,
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

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  useEffect(() => {
    brandStateData && setbrand((pre) => ({ ...pre, ...brandStateData }));
  }, [brandStateData]);
  return (
    <>
      {/*start Brands*/}
      <section className="section-padding">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">Shop By Brands</h3>
            <p className="mb-0 text-capitalize">
              Select your favorite brands and purchase
            </p>
          </div>
          <div className="brands">
            <div className="row">
              <Swiper {...swip}>
                {brandStateData &&
                  brandStateData
                    .filter((br) => br.active)
                    .map((brnd, indx) => {
                      return (
                        <SwiperSlide key={brnd.id || indx}>
                          <div className="col">
                            <div className="p-3 border rounded brand-box">
                              <div className="d-flex align-items-center">
                                <Link
                                  to={`/shop/brand/${encodeURIComponent(brnd.name)}`}
                                >
                                  <img
                                    height={100}
                                    width={200}
                                    src={
                                      brnd.pic
                                        ? `${import.meta.env.VITE_SITE_SERVER}/brand/${brnd.pic}`
                                        : "assets/images/brands/01.webp"
                                    }
                                    alt="brand"
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
              </Swiper>
            </div>
            {/*end row*/}
          </div>
        </div>
      </section>
      {/*end Brands*/}
    </>
  );
}
