import React from "react";
import { Link } from "react-router-dom";

export default function TrandingProduct({ latestPic }) {
  let lastPic = latestPic?.pic?.at(-1) ?? null;

  if (latestPic) {
    return (
      <>
        {/*start special product*/}
        <section className="section-padding bg-section-2">
          <div className="container">
            <div className="card border-0 rounded-0 p-3 depth">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-6 text-center">
                  {latestPic && (
                    <Link to={`/product/${latestPic.id}`}>
                      <img
                        style={{ height: "450px", width: "350px" }}
                        src={
                          lastPic
                            ? `${import.meta.env.VITE_SITE_SERVER}/product/${lastPic}`
                            : "assets/images/extra-images/promo-large.webp"
                        }
                        className="img-fluid rounded-0"
                        alt="..."
                      />{" "}
                    </Link>
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="card-body">
                    <h3 className="fw-bold">New Features of Latest Product</h3>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-transparent px-0">
                        {(latestPic &&
                          latestPic.discription.replace(/<[^>]+>/g, "")) ||
                          "This is Our Best New Arrival and it's already turning heads! Crafted with premium materials and designed for everyday elegance, this product blends comfort with style like never before. Whether you're upgrading your wardrobe or gifting someone special, this fresh drop is a must-have. Limited stock available — don't miss your chance to own the season’s most talked-about item. Perfect for casual outings, festive gatherings, or just making a statement. Customers are loving it, and reviews are pouring in. Be the first to experience the trend everyone’s talking about. Shop now and elevate your look instantly!"}
                      </li>
                    </ul>
                    <div className="buttons mt-4 d-flex flex-column flex-lg-row gap-3">
                      <Link
                        to={`/shop`}
                        className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                      >
                        shop Now
                      </Link>
                      <Link
                        to={`product/${latestPic.id}`}
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*start special product*/}
      </>
    );
  }
}
