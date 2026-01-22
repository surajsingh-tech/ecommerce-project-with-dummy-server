import React, { useEffect, useState } from "react";

import LatestProduct from "../Components/LatestProduct";
import Features from "./FeaturesPage";
import TrandingProduct from "../Components/TrandingProduct";
import BrandSlider from "../Components/BrandSlider";
import CategoriSlider from "../Components/CategoriSlider";
import ProductSlider from "../Components/ProductSlider";
import { Link } from "react-router-dom";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator";
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  let mainCategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let subCategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let productStateData = useSelector((state) => state.ProductStateData);

  let [latestPic, setLaytestPic] = useState(); //for to show Tranding Product

  let trandingPic = () => {
    if (productStateData) {
      let LastProduct = productStateData[productStateData.length - 1];
      setLaytestPic(LastProduct);
    }
  };

  useEffect(() => {
    if (productStateData) {
      trandingPic();
    }
  }, [productStateData]);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getMaincategory());
    dispatch(getSubcategory());
  }, []);

  return (
    <>
      {/* <!--start page content-->+*/}
      <div className="page-content">
        {/*start carousel*/}
        <section className="slider-section">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={1}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={2}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={3}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={4}
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active bg-yellow">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-dark fw-bold">
                        Latest Trending
                      </h3>
                      <h1 className="h1 text-dark fw-bold">
                        Electronics Items
                      </h1>
                      <p className="text-dark fw-bold">
                        <i>Last call for upto 45%</i>
                      </p>
                      <div className="">
                        <Link
                          className="btn btn-dark btn-ecomm"
                          to="/shop/electronic"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_4.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item  bg-primary">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        New Arrival
                      </h3>
                      <h1 className="h1 text-white fw-bold">Women Fashion</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 25%</i>
                      </p>
                      <div className="">
                        <Link
                          className="btn btn-dark btn-ecomm"
                          to="/shop/female"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_1.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-red">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        Latest Trending
                      </h3>
                      <h1 className="h1 text-white fw-bold">Fashion Wear</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 35%</i>
                      </p>
                      <div className="">
                        {" "}
                        <Link
                          className="btn btn-dark btn-ecomm"
                          to="/shop/fashion"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_2.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-purple">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        New Trending
                      </h3>
                      <h1 className="h1 text-white fw-bold">Kids Fashion</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 15%</i>
                      </p>
                      <div className="">
                        <Link
                          className="btn btn-dark btn-ecomm"
                          to="/shop/kids"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_3.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-green">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        Super Deals
                      </h3>
                      <h1 className="h1 text-white fw-bold">Home Furniture</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 24%</i>
                      </p>
                      <div className="">
                        <Link
                          className="btn btn-dark btn-ecomm"
                          to="/shop/furniture"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_5.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        {mainCategoryStateData &&
          mainCategoryStateData
            .filter((item) => item.active)
            .map((item) => {
              return (
                <ProductSlider
                  key={item.id}
                  title={item.name}
                  data={
                    productStateData &&
                    productStateData.filter((p) => p.maincategory === item.name)
                  }
                />
              );
            })}

        <LatestProduct
          category={mainCategoryStateData.filter((x) => x.active)}
          data={productStateData.filter((x) => x.active)}
        />

        <Features />

        {latestPic && <TrandingProduct latestPic={latestPic} />}

        <BrandSlider />
        {mainCategoryStateData && (
          <CategoriSlider
            title="Maincategory"
            data={mainCategoryStateData.filter((item) => item.active)}
          />
        )}
        {subCategoryStateData && (
          <CategoriSlider
            title={"Subcategory"}
            data={subCategoryStateData.filter((item) => item.active)}
          />
        )}
      </div>
      {/*end carousel*/}
    </>
  );
}
