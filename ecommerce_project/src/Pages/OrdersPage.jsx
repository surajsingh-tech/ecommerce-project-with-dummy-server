import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import BuyersSideBar from "../Components/BuyersSideBar";
import CheckOutPage from "./CheckOutPage";
import { useSelector, useDispatch } from "react-redux";
import { getCheckout } from "../Redux/ActionCreators/CheckoutActionCreator";
import {
  createTestimonial,
  getTestimonial,
  updateTestimonial,
} from "../Redux/ActionCreators/TestimonialActionCreators";
import DOMPurify from "dompurify";

export default function OrdersPage() {
  let [order, setOrder] = useState([]);
  let CheckOutStateData = useSelector((x) => x.CheckoutStateData);
  let dispatch = useDispatch();
  let [message, setMessage] = useState("");
  let [reviews, setReviews] = useState([]);
  let [product, setProduct] = useState({
    productId: "",
    orderPId: "",
  });
  let test = (pId, oId) => {
    let res = reviews.find(
      (x) =>
        x.user === localStorage.getItem("userid") &&
        x.product === pId &&
        x.orderPId === oId,
    );
    return res;
  };

  let [data, setData] = useState({
    review: "",
    star: 5,
  });
  let TestimonialData = useSelector((x) => x.TestimonialStateData);

  useEffect(() => {
    dispatch(getCheckout());
  }, []);

  useEffect(() => {
    let userItem = CheckOutStateData.filter(
      (x) => x.user?.user === localStorage.getItem("userid"),
    );
    if (userItem) {
      setOrder(userItem);
    }
  }, [CheckOutStateData]);

  //For Review
  let getinputData = (e) => {
    setMessage("");
    let { value, name } = e.target;
    setData((old) => {
      return { ...old, [name]: name === "star" ? parseInt(value) : value };
    });
  };

  let postReview = (e, pID, oID) => {
    e.preventDefault();
    if (Object.hasOwn(data, "id")) {
      dispatch(updateTestimonial({ ...data }));
      setMessage("Thank you again! Your review has been successfully updated.");
      setData({
        review: "",
        star: 5,
      });
    } else {
      dispatch(
        createTestimonial({
          ...data,
          name: localStorage.getItem("name"),
          user: localStorage.getItem("userid"),
          product: pID,
          orderPId: oID,
          date: new Date(),
        }),
      );
      setMessage("Thank you again! Your review has been submitted.");
      setData({
        review: "",
        star: 5,
      });
    }
  };

  useEffect(() => {
    dispatch(getTestimonial());
  }, []);

  useEffect(() => {
    let userData = TestimonialData.filter(
      (x) => x.user === localStorage.getItem("userid"),
    );
    if (userData) {
      setReviews(userData);
    }
  }, [TestimonialData]);
  return (
    <>
      {order.length > 0 ? (
        <div className="page-content">
          <BreadCrumb title={"Orders"} />
          {/*start product details*/}
          <section className="section-padding">
            <div className="container">
              <div className="d-flex align-items-center px-3 py-2 border mb-4">
                <div className="w-100 text-center">
                  <h4 className="mb-0 h4 fw-bold">Account - Orders</h4>
                </div>
              </div>
              <div
                className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbarFilter"
              >
                <span>
                  <i className="bi bi-person me-2" />
                  Account
                </span>
              </div>
              <div className="row">
                <div className="col-12 col-xl-3 filter-column">
                  <nav className="navbar navbar-expand-xl flex-wrap p-0">
                    <div
                      className="offcanvas offcanvas-start"
                      tabIndex={-1}
                      id="offcanvasNavbarFilter"
                      aria-labelledby="offcanvasNavbarFilterLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title mb-0 fw-bold text-uppercase"
                          id="offcanvasNavbarFilterLabel"
                        >
                          Account
                        </h5>
                        <button
                          type="button"
                          className="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        />
                      </div>
                      <BuyersSideBar />
                    </div>
                  </nav>
                </div>
                <div className="col-12 col-xl-9">
                  {order?.map((x, indx) => {
                    // सारे products का subtotal निकालना
                    const subTotal = x.product?.reduce((acc, p) => {
                      return acc + (p?.finalPrice ?? 0) * (p?.quantity ?? 0);
                    }, 0);

                    // Delivery charge जोड़कर total निकालना
                    const total = subTotal + 29;
                    return (
                      <div key={x.id || indx} className="order-box mb-4 p-3">
                        <div className="row g-0">
                          <div className="col-12 col-xl-5  col-md-5 mb-1">
                            <div className="card h-100">
                              <div className="card-header bg-dark text-white text-center">
                                Order Details
                              </div>
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table table-bordered border-dark">
                                    <tbody>
                                      <tr>
                                        <th>Order Id</th>
                                        <td>{x?.id ?? ""}</td>
                                      </tr>
                                      <tr>
                                        <th>OrderStatus</th>
                                        <td>{x?.orderStatus ?? ""}</td>
                                      </tr>
                                      <tr>
                                        <th>Payment Mode</th>
                                        <td>{x?.paymentMode ?? ""}</td>
                                      </tr>
                                      <tr>
                                        <th>Payment Status</th>
                                        <td>{x?.paymentStatus ?? ""}</td>
                                      </tr>
                                      <tr>
                                        <th>Sub Total</th>
                                        <td>{subTotal}</td>
                                      </tr>
                                      <tr>
                                        <th>Total+₹29 Delevery </th>
                                        <td>
                                          &#8377;{total}
                                          <br />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Shipping</th>
                                        <td>{x?.shipping ?? ""}</td>
                                      </tr>
                                      <tr>
                                        <th>Order Date and Time</th>
                                        <td>
                                          {x?.date
                                            ? new Date(x.date).toLocaleString()
                                            : ""}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-7 col-md-7 mb-1">
                            <div className="card h-100">
                              <div className="card-header bg-dark text-white text-center">
                                Product's Details
                              </div>
                              {x.product?.map((p, indx) => {
                                return (
                                  <div className="card-body">
                                    <div className="d-flex flex-column flex-xl-row gap-3 mt-3  ">
                                      <div className="product-img">
                                        <img
                                          src={
                                            p.pic
                                              ? `${import.meta.env.VITE_SITE_SERVER}/product/${p.pic}`
                                              : "assets/images/featured-products/05.webp"
                                          }
                                          width={250}
                                          height={300}
                                          alt=""
                                        />
                                      </div>
                                      <div className="product-info flex-grow-1 ">
                                        <h5 className="fw-bold mb-1">
                                          {p?.name ?? ""}
                                        </h5>
                                        <p
                                          className="mb-0"
                                          dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                              p?.discription ?? "",
                                            ),
                                          }}
                                        />
                                        <div className="mt-3 hstack gap-2 text-dark">
                                          Size :
                                          {p.selectedSizes?.map((s, indx) => {
                                            return (
                                              <button
                                                type="button"
                                                className="btn btn-sm border rounded-0"
                                                key={s || indx}
                                              >
                                                {s}
                                              </button>
                                            );
                                          }) ?? ""}
                                        </div>
                                        <div className="mt-3 hstack gap-2 text-dark">
                                          Price :{" "}
                                          <span>{p?.finalPrice ?? ""}</span>
                                        </div>
                                        <div className="mt-3 hstack gap-2 text-dark">
                                          Qty :
                                          <button
                                            type="button"
                                            className="btn btn-sm border rounded-0"
                                          >
                                            {p?.quantity ?? ""}
                                          </button>
                                        </div>
                                        <div className="mt-3 hstack gap-2 text-dark">
                                          Brand : <span>{p?.brand ?? ""}</span>
                                        </div>
                                        <div className="mt-4 d-flex justify-content-start gap-3 flex-wrap">
                                          <Link
                                            to={`/product/${p.productId}`}
                                            className="btn btn-sm btn-dark border rounded text-white"
                                          >
                                            Shop Again
                                          </Link>

                                          {reviews &&
                                          test(p.productId, p.id) ? (
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-outline-warning d-flex align-items-center"
                                              data-bs-toggle="modal"
                                              data-bs-target="#review"
                                              onClick={() => {
                                                setMessage("");
                                                setProduct({
                                                  productId: p.productId,
                                                  orderPId: p.id,
                                                });
                                                let item = reviews.find(
                                                  (x) =>
                                                    x.product === p.productId &&
                                                    x.orderPId === p.id,
                                                );
                                                setData({ ...item });
                                              }}
                                            >
                                              <i className="bi bi-star-fill me-2" />
                                              Update Review
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-outline-warning d-flex align-items-center"
                                              data-bs-toggle="modal"
                                              data-bs-target="#review"
                                              onClick={() => {
                                                setMessage("");
                                                setProduct({
                                                  productId: p.productId,
                                                  orderPId: p.id,
                                                });
                                                setData({
                                                  review: "",
                                                  star: 5,
                                                });
                                                setProduct({
                                                  productId: p.productId,
                                                  orderPId: p.id,
                                                });
                                              }}
                                            >
                                              <i className="bi bi-star-fill me-2" />
                                              Write Review
                                            </button>
                                          )}
                                        </div>
                                        <div
                                          className="modal"
                                          style={{ marginTop: "200px" }}
                                          id="review"
                                          tabIndex={-1}
                                        >
                                          <div className="modal-dialog">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                {!message && (
                                                  <h5 className="modal-title">
                                                    Write a Review
                                                  </h5>
                                                )}
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                />
                                              </div>
                                              <form
                                                onSubmit={(e) =>
                                                  postReview(
                                                    e,
                                                    product.productId,
                                                    product.orderPId,
                                                  )
                                                }
                                              >
                                                {message ? (
                                                  <div className="alert alert-success d-flex align-items-center justify-content-center p-4 rounded shadow">
                                                    <i className="bi bi-check-circle-fill me-2 fs-3"></i>
                                                    <p className="mb-0 fs-4 fw-bold text-success">
                                                      {message}
                                                    </p>
                                                  </div>
                                                ) : (
                                                  <>
                                                    <div className="modal-body">
                                                      <textarea
                                                        name="review"
                                                        className="form-control border-dark"
                                                        rows={5}
                                                        value={data?.review}
                                                        onChange={(e) =>
                                                          getinputData(e)
                                                        }
                                                        placeholder="Write Your Reviews About This Product"
                                                      />
                                                      <div className="mt-2 row">
                                                        <label>Star</label>
                                                        <select
                                                          name="star"
                                                          value={data?.star}
                                                          onChange={(e) =>
                                                            getinputData(e)
                                                          }
                                                          className="form-select border-dark"
                                                        >
                                                          <option>5</option>
                                                          <option>4</option>
                                                          <option>3</option>
                                                          <option>2</option>
                                                          <option>1</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                      <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-bs-dismiss="modal"
                                                      >
                                                        Close
                                                      </button>
                                                      <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                      >
                                                        Save changes
                                                      </button>
                                                    </div>
                                                  </>
                                                )}
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/*end row*/}
            </div>
          </section>
        </div>
      ) : (
        <h3>There is No Order Data</h3>
      )}
    </>
  );
}
