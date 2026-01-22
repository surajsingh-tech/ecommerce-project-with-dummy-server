import React from "react";
import { Link } from "react-router-dom";

export default function ProductCart({ item }) {
  if (!item) return null;
  return (
    <>
      <div className="card">
        <div className="position-relative overflow-hidden">
          <div className="product-options  text-center position-absolute bottom-0 start-0 end-0">
            <p className="text-dark fs-6 fw-bolder">{item.brand}</p>
          </div>
          <Link to={`/product/${item.id}`}>
            <img
              height={320}
              src={
                item.pic[0]
                  ? `${import.meta.env.VITE_SITE_SERVER}/product/${item.pic[0]}`
                  : "assets/images/featured-products/02.webp"
              }
              className="card-img-top"
              alt="..."
            />
          </Link>
        </div>
        <div className="card-body">
          <div className="product-info text-center">
            <h6 className="mb-1 fs-5 fw-bold product-name">{item.name}</h6>
            {item.stockQuantity === 0 ? (
              <p style={{ color: "red", fontWeight: "500" }}>Out of Stock</p>
            ) : (
              <p>Only {item.stockQuantity} in Stock</p>
            )}
            <div className="ratings mb-1 h6">
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
            </div>
            <p className="mb-3 h6 fw-bold product-price">
              <del>₹{item.basePrice}</del>
              <span className="text-success">({item.discount}% OFF)</span>
              &nbsp;₹{item.finalPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
