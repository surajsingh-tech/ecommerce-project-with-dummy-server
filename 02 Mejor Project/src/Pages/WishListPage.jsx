import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getWishlist,
} from "../Redux/ActionCreators/WishListAction";
import { Link } from "react-router-dom";
export default function WishListPage() {
  let dispatch = useDispatch();
  let selector = useSelector((x) => x.WishListStateData);
  let [data, setDAta] = useState();

  let RemoveFromWishList = async (id) => {
    let res = await dispatch(deleteWishlist({ id }));
    if (res) {
      toast.warn("Item Sucessfully Remove ");
    } else {
      toast.error("Some issue occur");
    }
  };

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  useEffect(() => {
    if (selector) {
      setDAta(selector);
    }
  }, [selector]);

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"WishList"} />
        {/*start product wishlist*/}
        <ToastContainer position="top-right" autoClose={1500} />
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="w-100 text-center">
                <h4 className="mb-0 h4 fw-bold">Wishlist (10 Items)</h4>
              </div>
              <div className="ms-auto">
                <button type="button" className="btn btn-light btn-ecomm">
                  Continue Shopping
                </button>
              </div>
            </div>
            <div className="similar-products">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {data?.map((item, indx) => {
                  return (
                    <div className="col" key={item.id || indx}>
                      <div className="card rounded-0">
                        <div
                          className="btn-close wishlist-close position-absolute end-0 top-0"
                          onClick={() => RemoveFromWishList(item.id)}
                        />
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={
                              item.pic
                                ? `${import.meta.env.VITE_SITE_SERVER}/product/${item.pic}`
                                : "assets/images/best-sellar/01.webp"
                            }
                            alt="...Image"
                            height={300}
                            width={250}
                            className="card-img-top rounded-0"
                          />
                        </Link>
                        <div className="card-body border-top text-center">
                          <p className="mb-0 product-short-name">{item.name}</p>
                          <div className="product-price d-flex align-items-center gap-2 mt-2 justify-content-center">
                            <div className="h6 fw-bold">{item.finalPrice}</div>
                            <div className="h6 fw-light text-muted text-decoration-line-through">
                              {item.basePrice}
                            </div>
                            <div className="h6 fw-bold text-danger">
                              ({item.discount}% off)
                            </div>
                          </div>
                        </div>
                        <div className="card-footer bg-transparent text-center">
                          <Link
                            to={`/product/${item.productId}`}
                            className="btn btn-ecomm w-100"
                          >
                            Add to Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/*end row*/}
            </div>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  );
}
