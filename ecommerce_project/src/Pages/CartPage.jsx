import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../Redux/ActionCreators/CartActionCreator";
import { Link } from "react-router-dom";
import {
  createWishlist,
  getWishlist,
} from "../Redux/ActionCreators/WishListAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "../Components/OrderSummary";

export default function CartPage() {
  let selector = useSelector((x) => x.CartStateData);
  let dispatch = useDispatch();
  let [data, setData] = useState([]);
  let [wishListData, setWishListData] = useState();
  let WishlistSelector = useSelector((x) => x.WishListStateData);

  let addWishList = async (item) => {
    const cartPayload = {
      productId: item?.productId,
      pic: item?.pic ?? [],
      finalPrice: item.finalPrice,
      discount: item.discount,
      basePrice: item.basePrice,
      brand: item.brand,
      name: item.name,
    };
    let chkItemInWishList = wishListData.find(
      (x) => x.productId === item.productId,
    );
    if (chkItemInWishList) {
      toast.info("Item Already Added");
    } else {
      try {
        let res = await dispatch(createWishlist({ ...cartPayload }));
        if (res) {
          toast.warn("Item Sucessfully Added In WishList");
        }
      } catch {
        toast.error("Some issue occur");
      }
    }
  };

  let removeItemCart = async (id) => {
    try {
      let res = await dispatch(deleteCart({ id }));
      if (res) {
        toast.warn("Item Sucessfully Remove");
        await dispatch(getCart());
      }
    } catch {
      toast.error("Some error occur");
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (selector) {
      setData(selector);
    }
  }, [selector]);

  //for WihsList
  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  useEffect(() => {
    if (WishlistSelector) {
      setWishListData(WishlistSelector);
    }
  }, [WishlistSelector]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={500} />
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Cart"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">My Bag ({data?.length})</h4>
              </div>
              <div className="ms-auto">
                <Link to="/shop" className="btn btn-light btn-ecomm">
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-xl-8">
                {data?.map((item, indx) => {
                  return (
                    <div className="card rounded-0 mb-3" key={item.id || indx}>
                      <div className="card-body">
                        <div className="d-flex flex-column flex-lg-row gap-3">
                          <div className="product-img">
                            <img
                              src={
                                item.pic
                                  ? `${import.meta.env.VITE_SITE_SERVER}/product/${item.pic}`
                                  : "assets/images/featured-products/01.webp"
                              }
                              width={190}
                              height={220}
                              alt=""
                            />
                          </div>
                          <div className="product-info flex-grow-1">
                            <div className="d-flex">
                              <h5 className="fw-bold mb-0 mx-1">{item.name}</h5>
                              {item.stockQuantity &&
                              item.stockQuantity !== 0 ? (
                                <p className="text-success">
                                  Only {item.stockQuantity} items in stock{" "}
                                </p>
                              ) : (
                                <p className="text-danger">Out Of Stock</p>
                              )}
                            </div>

                            <div className="product-price d-flex align-items-center gap-2 mt-0">
                              <div className="h6 fw-bold">
                                &#8377;{item.finalPrice}
                              </div>
                              <div className="h6 fw-light text-muted text-decoration-line-through">
                                &#8377;{item.basePrice}
                              </div>
                              <div className="h6 fw-bold text-danger">
                                ({item.discount})%
                              </div>
                            </div>
                            <div className="mt-1 hstack gap-2 ">
                              <label className="text-dark">Size :</label>
                              {item.selectedSizes?.map((s, indx) => {
                                return (
                                  <span key={indx} className="text-dark">
                                    {s}
                                  </span>
                                );
                              })}
                            </div>
                            <div className="mt-2 hstack gap-2">
                              <label className="text-dark">Qty :</label>
                              <span className="text-dark">{item.quantity}</span>
                            </div>
                            <div className="mt-2 hstack gap-2 ">
                              <label className="text-dark">Color :</label>
                              {item.selectedColors?.map((clr, indx) => (
                                <span key={indx} className="text-dark">
                                  {clr}
                                </span>
                              ))}
                            </div>
                            <div className="mt-2 hstack gap-2 ">
                              <label className="text-dark">
                                Final Price :&#8377;{item.finalPrice} x{" "}
                                {item.quantity} =={">"}{" "}
                                {Number(item.finalPrice) *
                                  Number(item.quantity)}
                              </label>
                            </div>
                          </div>
                          <div className="d-none d-lg-block vr" />
                          <div className="d-grid gap-2 align-self-start align-self-lg-center">
                            <button
                              onClick={() => removeItemCart(item.id)}
                              type="button"
                              className="btn btn-ecomm"
                            >
                              <i className="bi bi-x-lg me-2" />
                              Remove
                            </button>
                            <button
                              onClick={() => addWishList(item)}
                              type="button"
                              className="btn dark btn-ecomm"
                            >
                              <i className="bi bi-suit-heart me-2" />
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {data.length > 0 && <OrderSummary />}
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  );
}
