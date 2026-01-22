import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator";
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator";
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator";
import { deleteCart, getCart } from "../Redux/ActionCreators/CartActionCreator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NevBar() {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  let login = localStorage.getItem("name");
  let role = localStorage.getItem("role");
  let maincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let subcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let brandStateData = useSelector((state) => state.BrandStateData);
  let dispatch = useDispatch();
  let [cartItem, setCartItem] = useState();
  let cart = useSelector((x) => x.CartStateData);

  let gotoCheckOut = () => {
    if (cart.length > 0) {
      navigate("/CheckOut");
    }
  };
  let removeItemCart = async (id) => {
    try {
      let res = await dispatch(deleteCart({ id }));
      if (res) {
        toast.warn("Item Sucessfully Remove");
      }
    } catch {
      toast.error("Some error occur");
    }
  };

  useEffect(() => {
    setCartItem(cart);
  }, [cart]);

  useEffect(() => {
    dispatch(getMaincategory());
    dispatch(getSubcategory());
    dispatch(getBrand());
    dispatch(getCart());
  }, []);

  return (
    <>
      {/*start top header*/}
      <ToastContainer position="top-right" autoClose={1000} />
      <header className="top-header mb-4">
        <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
          <Link className="navbar-brand d-none d-xl-inline" to="/">
            <img
              src="assets/images/logo.png"
              className="logo-img"
              style={{ width: "72px" }}
              alt=""
            />
          </Link>
          <a
            className="mobile-menu-btn d-inline d-xl-none"
            href="javascript:;"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <i className="bi bi-list" />
          </a>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <img
                  src="assets/images/logo.webp"
                  className="logo-img"
                  alt=""
                />
              </div>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body primary-menu">
              <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="tv-shows.html"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </a>
                  <div className="dropdown-menu dropdown-large-menu">
                    <div className="row">
                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">MAINCATEGORY</h6>
                        <ul className="list-unstyled">
                          {maincategoryStateData &&
                            maincategoryStateData
                              .filter((item) => item.active)
                              .map((item) => {
                                return (
                                  item.active && (
                                    <li key={item.id}>
                                      <Link
                                        className="btn btn-primary btn-sm fw-bolder bg-black text-white text-center m-1 border-rounded"
                                        to={`/shop/Maincategory/${encodeURIComponent(item.name)}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  )
                                );
                              })}
                        </ul>
                      </div>

                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">SUBCATEGORY</h6>
                        <ul className="list-unstyled">
                          {subcategoryStateData &&
                            subcategoryStateData
                              .filter((item) => item.active)
                              .map((item) => {
                                return (
                                  item.active && (
                                    <li key={item.id}>
                                      <Link
                                        className="btn btn-primary btn-sm fw-bolder bg-black text-white text-center m-1 border-rounded"
                                        to={`/shop/Subcategory/${encodeURIComponent(item.name)}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  )
                                );
                              })}
                        </ul>
                      </div>

                      <div className="col-12 col-xl-3">
                        <h6 className="large-menu-title">BRAND</h6>
                        <ul className="list-unstyled">
                          {brandStateData &&
                            brandStateData
                              .filter((item) => item.active)
                              .map((item) => {
                                return (
                                  item.active && (
                                    <li key={item.id}>
                                      <Link
                                        className="btn btn-primary btn-sm fw-bolder bg-black text-white text-center m-1 border-rounded"
                                        to={`/shop/brand/${encodeURIComponent(item.name)}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  )
                                );
                              })}
                        </ul>
                      </div>
                      <div className="col-12 col-xl-3 d-none d-xl-block">
                        <div className="pramotion-banner1">
                          <img
                            src="assets/images/menu-img.webp"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/features">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/testimonial">
                    Testimonial
                  </Link>
                </li>
                {login ? (
                  <li className="nav-item dropdown">
                    {role === "Buyer" && (
                      <>
                        <a
                          className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                          href="javascript:;"
                          data-bs-toggle="dropdown"
                        >
                          {localStorage.getItem("name")}
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/dashBoard">
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/myorders">
                              My Orders
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/profile">
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/updateProfile">
                              Edit Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/buyerAddress">
                              Addresses
                            </Link>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => logout()}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                    {(role === "Admin" || role === "Super Admin") && (
                      <>
                        <Link
                          className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                          data-bs-toggle="dropdown"
                        >
                          {localStorage.getItem("name")}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/admin" className="dropdown-item">
                              Admin Pannel
                            </Link>{" "}
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => logout()}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <ul className="navbar-nav secondary-menu flex-row">
            <li className="nav-item">
              <a className="nav-link dark-mode-icon" href="javascript:void(0);">
                <div className="mode-icon">
                  <i className="bi bi-moon" />
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="search.html">
                <i className="bi bi-search" />
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className="bi bi-suit-heart" />
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                href="javascript:void(0);"
              >
                <div className="cart-badge">{cartItem?.length}</div>
                <i className="bi bi-basket2" />
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashBoard">
                <i className="bi bi-person-circle" />
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="offcanvas offcanvas-end"
          data-bs-scroll="true"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          aria-modal="true"
          role="dialog"
        >
          <div className="offcanvas-header bg-section-2">
            <h5 className="mb-0 fw-bold" id="offcanvasRightLabel">
              {cartItem?.length} items in the cart
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>

          <div className="offcanvas-body">
            {cartItem?.map((x, indx) => {
              return (
                <React.Fragment key={x.id || indx}>
                  <div className="cart-list">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bottom-product-img ">
                        <Link to={`/product/${x.productId}`}>
                          <img
                            src={
                              x.pic
                                ? `${import.meta.env.VITE_SITE_SERVER}/product/${x.pic}`
                                : "assets/images/new-arrival/01.webp"
                            }
                            height={70}
                            width={70}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-light mb-1">{x.name}</h6>
                        <p className="mb-0">
                          <strong className="text-dark">
                            {x.quantity} X {x.finalPrice}
                          </strong>
                        </p>
                      </div>
                      <div className="ms-auto fs-5">
                        <button
                          onClick={() => removeItemCart(x.id)}
                          className="link-dark"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              );
            })}
          </div>
          <div className="offcanvas-footer p-3 border-top">
            <div className="d-grid">
              <button
                onClick={() => gotoCheckOut()}
                className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                data-bs-dismiss="offcanvas"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/*end top header*/}
    </>
  );
}
