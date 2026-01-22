import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCart from "./ProductCart";

export default function LatestProduct({ category, data }) {
  let [selected, setSelected] = useState("All");

  const filteredData = useMemo(() => {
    return (data || [])
      .filter(
        (item) =>
          item.active && (selected === "All" || item.maincategory === selected),
      )
      .slice(0, 24);
  }, [data, selected]);

  return (
    <>
      <section className="product-tab-section section-padding bg-light">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">Latest Products</h3>
            <p className="mb-0 text-capitalize">Checkout New Arrivals</p>
          </div>
          <div className="row">
            <div className="col-auto mx-auto">
              <div className="product-tab-menu table-responsive">
                <ul
                  className="nav nav-pills flex-nowrap"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#new-arrival"
                      type="button"
                      onClick={() => {
                        setSelected("All");
                      }}
                    >
                      ALL
                    </button>
                  </li>
                  {category.map((item, indx) => {
                    return (
                      <li
                        className="nav-item"
                        role="presentation"
                        key={item.id || indx}
                      >
                        <button
                          className="nav-link "
                          data-bs-toggle="pill"
                          data-bs-target="#new-arrival"
                          type="button"
                          onClick={() => {
                            setSelected(item.name);
                          }}
                        >
                          {item.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="tabular-product" key={selected}>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-4">
              {filteredData?.map((item, indx) => (
                <div className="col" key={item?.id || indx}>
                  <ProductCart item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
