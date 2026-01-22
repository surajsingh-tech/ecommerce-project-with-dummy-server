import BreadCrumb from "../Components/BreadCrumb";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "../Components/ProductCart";
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";
import { useSelector, useDispatch } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
const getSlideFun = () => {
  if (window.innerWidth < 560) return 1;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 992) return 3;
  return 4;
};

export default function TestimonialPage() {
  let [slideView, setView] = useState(getSlideFun());
  let [testimonial, setTestimonial] = useState([]);
  let TestimonialData = useSelector((x) => x.TestimonialStateData);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTestimonial());
  }, []);

  useEffect(() => {
    let x = TestimonialData.filter((x) => x.star >= 3);
    if (x) {
      setTestimonial(x);
    }
  }, [TestimonialData]);

  useEffect(() => {
    const handleResize = () => setView(getSlideFun());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let swip = {
    slidesPerView: slideView,
    spaceBetween: 30,
    freeMode: true,
    loop: testimonial.length > slideView,
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
    <div className="page-content testimonial-container">
      <BreadCrumb title="Customer's Reviews" />

      <section className="section-padding">
        <div className="container">
          {/* Heading + Intro */}
          <div className="text-center pb-3">
            <h3 className="h3 fw-bold mb-3">Our Customer's Reviews</h3>
            <p className="text-dark mb-4">
              <span className="fw-bold fst-italic text-primary ">
                {import.meta.env.VITE_SITE_SITENAME}
              </span>{" "}
              stands out as the best e‑commerce platform. We make shopping easy
              with a clean interface, secure payments, and fast delivery. Every
              product is carefully described and packaged with care. Customers
              appreciate the convenience and trust our service. With{" "}
              <span className="fw-bold fst-italic text-primary ">
                {import.meta.env.VITE_SITE_SITENAME}
              </span>
              , online shopping becomes simple, reliable, and enjoyable.
            </p>
          </div>

          {/* Swiper Section */}
          <div className="product-thumbs mb-3 ">
            <Swiper {...swip}>
              {testimonial.map((p, indx) => {
                const n = p.star;
                return (
                  <SwiperSlide key={p.id || indx}>
                    <div className="card review-card p-3 border rounded mx-auto bg-light testimonial-card">
                      <h6 className="fw-bold mb-2 text-primary">{p.name}</h6>

                      <p className="testimonial-msg mb-2 text-dark">
                        {p.review}
                      </p>

                      <div className="rating mb-2">
                        {Array.from({ length: n }, (_, i) => (
                          <i
                            key={`star-fill-${i}`}
                            className="bi bi-star-fill text-warning h6"
                          ></i>
                        ))}
                        {Array.from({ length: 5 - n }, (_, i) => (
                          <i key={`star-empty-${i}`} className="bi bi-star"></i>
                        ))}
                      </div>

                      <small className="text-mute">
                        By {p.name} on {new Date(p.date).toLocaleDateString()}
                      </small>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
