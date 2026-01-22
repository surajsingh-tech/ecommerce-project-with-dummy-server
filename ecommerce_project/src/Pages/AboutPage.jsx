import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import BrandSlider from "../Components/BrandSlider";
import Features from "../Components/Features";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"About"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <h3 className="fw-bold text-center">About Us</h3>
                <p className="text-dark text-justify">
                  👗 <span className="text-dark fw-bold">Who We Are</span>
                  <br />
                  Welcome to our site{" "}
                  <span className="text-dark fw-bold">Shopping</span>—where
                  fashion meets purpose. We’re more than an online store; we’re
                  a destination for self-expression. Born from a passion for
                  style and simplicity, our journey began with a vision to make
                  fashion accessible, empowering, and joyful. Whether you're
                  relaxing at home, heading to work, or celebrating life’s
                  moments, our collections help you dress with confidence and
                  flair.
                </p>
                <p className="text-dark text-justify">
                  🛍️ <span className="text-dark fw-bold">What We Offer</span>
                  <br />
                  Discover a curated range of clothing and accessories for men,
                  women, and kids. From everyday essentials and festive ethnic
                  wear to office-ready outfits and seasonal must-haves, every
                  item is handpicked for quality, comfort, and charm. We
                  collaborate with talented designers and artisans to bring you
                  fashion that lasts. Enjoy seamless browsing, secure payments,
                  and fast delivery—because your style deserves a smooth
                  shopping experience.
                </p>
                <p className="text-dark text-justify">
                  🌟 <span className="text-dark fw-bold">Why Choose Us</span>
                  <br />
                  At <span className="text-dark fw-bold">Shopping</span>, we’re
                  committed to making fashion personal. Our team is here to
                  support you with size guides, styling tips, and responsive
                  customer care. We believe great fashion should be fun,
                  inclusive, and inspiring. Join our growing community of
                  trendsetters and see why{" "}
                  <span className="text-dark fw-bold">Shopping</span> is your
                  trusted partner for wardrobe upgrades.
                </p>
                <Link
                  to={`/shop`}
                  className="btn btn-dark text-light text-center w-100"
                >
                  Shop Now
                </Link>
              </div>
              <div className="col-12 col-xl-6 mt-5">
                <img
                  src="https://images.pexels.com/photos/7679877/pexels-photo-7679877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid mt-5 "
                  alt=""
                />
              </div>
            </div>
            {/*end row*/}

            <h3 className="mb-0 h3 mt-4 fw-bold text-center">Why Choose Us</h3>
            <Features />
            <BrandSlider />
          </div>
        </section>
        {/*end product details*/}
      </div>
      {/*end page content*/}
    </>
  );
}
