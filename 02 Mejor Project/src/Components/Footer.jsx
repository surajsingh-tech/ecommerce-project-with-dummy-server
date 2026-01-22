import React, { useEffect, useState } from "react";
import NewsLetter from "../Components/NewsLetter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSetting } from "../Redux/ActionCreators/SettingActionCreator";
export default function Footer() {
  const settingStateData = useSelector((state) => state.SettingStateData);

  let [data, setData] = useState({
    map1: "",
    map2: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    youtube: "",
    linkdin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    sitename: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSetting());
  }, []);

  useEffect(() => {
    setData({ ...data, ...settingStateData[0] });
  }, [settingStateData.length]);
  return (
    <>
      <NewsLetter />
      {/*start footer*/}
      <section className="footer-section bg-section-2 section-padding bg-dark">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            <div className="col">
              <div className="footer-widget-6">
                <img
                  src="assets/images/logo.png"
                  className="logo-img mb-3"
                  alt=""
                />
                <h5 className="mb-3 fw-bold text-light">About Us</h5>
                <p className="mb-2 text-justify text-light ">
                  Welcome to our e-commerce hub—where quality meets convenience.
                  We offer curated products, secure payments, and fast delivery.
                  Our mission is to simplify your shopping experience with
                  trust, value, and exceptional customer support every step of
                  the way.
                </p>
                <a className="link-dark" href="javascript:;">
                  Read More
                </a>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-7 ms-2 mt-1">
                <h5 className="mb-3 text-light fw-bold">Explore</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link className="fw-bold text-light" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="/shop">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="/features">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="/testimonial">
                      Testimonial
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-8  ms-2 mt-1">
                <h5 className="mb-3 text-light fw-bold">Our Policy</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link className="fw-bold text-light" to="#">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="#">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="#">
                      Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-bold text-light" to="#">
                      Data Policy
                    </Link>
                  </li>
                  <div className="mb-3 mt-3">
                    <h5 className="mb-0 text-white">Address</h5>
                    <p className="mb-0 text-muted">
                      <Link
                        to={`${data.address ? data.address : import.meta.env.VITE_SITE_LOCATION}`}
                      >
                        {data.address
                          ? data.address
                          : import.meta.env.VITE_SITE_LOCATION}
                      </Link>
                    </p>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 text-light fw-bold">Follow Us</h5>
                <div className="social-link d-flex align-items-center gap-2">
                  <Link to={data.length ? data.facebook : "/"}>
                    <i className="text-light fw-bold bi bi-facebook" />
                  </Link>
                  <Link to={data.length ? data.twitter : "/"}>
                    <i className="text-light fw-bold bi bi-twitter" />
                  </Link>
                  <Link to={data.length ? data.linkdin : "/"}>
                    <i className="text-light fw-bold bi bi-linkedin" />
                  </Link>
                  <Link to={data.length ? data.youtube : "/"}>
                    <i className="text-light fw-bold bi bi-youtube" />
                  </Link>
                  <Link to={data.length ? data.instagram : "/"}>
                    <i className="text-light fw-bold bi bi-instagram" />
                  </Link>
                </div>
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 text-light fw-bold">Support</h5>
                  <p className="mb-0 text-light ">
                    {" "}
                    <Link
                      to={`mailto:${data.email ? data.email : import.meta.env.VITE_SITE_E_mail}`}
                    >
                      {data.email
                        ? data.email
                        : import.meta.env.VITE_SITE_E_mail}
                    </Link>
                  </p>
                </div>
                <div className="">
                  <h5 className="mb-0 text-light fw-bold">Toll Free</h5>
                  <p className="mb-0 text-light ">
                    <Link
                      to={`tel:${data.length ? data.phone : import.meta.env.VITE_SITE_PHONE}`}
                    >
                      {data.phone
                        ? data.phone
                        : import.meta.env.VITE_SITE_PHONE}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="my-5" />
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h5 className="fw-bold mb-3 text-light">Visit Our Location</h5>
              </div>
              <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                <div>
                  <Link
                    to={
                      data.map1 ? data.map1 : import.meta.env.VITE_SITE_LOCATION
                    }
                  >
                    Google Map
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
      </section>
      {/*end footer*/}
    </>
  );
}
