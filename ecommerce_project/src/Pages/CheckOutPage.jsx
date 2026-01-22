import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../Components/BreadCrumb";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteCart, getCart } from "../Redux/ActionCreators/CartActionCreator";
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreator";
import {
  getProduct,
  updateProduct,
} from "../Redux/ActionCreators/ProductActionCreator";

export default function CheckOutPage() {
  let [address, setAddress] = useState([]);
  let [selectedAddress, setSelectedAddress] = useState(null);
  let selector = useSelector((x) => x.CartStateData);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [data, setData] = useState();

  let [cardQty, setcardQty] = useState(0);
  let [finalCartPrise, setfinalCartPrise] = useState(0);
  let [mode, setMode] = useState("COD");
  let [product, setProduct] = useState();
  let productState = useSelector((x) => x.ProductStateData);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_SITE_SERVER}/address`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        response = await response.json();
        if (response) {
          let userADDress = response.filter(
            (x) => x.user === localStorage.getItem("userid"),
          );
          setAddress(userADDress);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (address.length > 0) {
      setSelectedAddress(address[0]);
    }
  }, [address]);

  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (data) {
      data.map((x) => {
        return (
          (price += Number(x.finalPrice) * Number(x.quantity)),
          (qty += Number(x.quantity))
        );
      });
    }
    setfinalCartPrise(price);
    setcardQty(qty);
  }, [data]);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    setData(selector);
  }, [selector]);

  useEffect(() => {
    setProduct(productState);
  }, [productState]);

  //For Place Order
  let placeOrder = async () => {
    let item = {
      user: selectedAddress,
      orderStatus: "Order is Placed",
      paymentMode: mode,
      paymentStatus: "Pending",
      shipping: "shipping",
      total: Math.round(finalCartPrise + 29),
      date: new Date(),
      product: data,
    };
    await dispatch(createCheckout(item));
    for (let cartItem of data) {
      let p = product.find((x) => x.id === cartItem.productId);
      p.stockQuantity = p.stockQuantity - cartItem.quantity;
      p.stock = p.stockQuantity === 0 ? false : true;
      await dispatch(updateProduct(p));
      await dispatch(deleteCart({ id: cartItem.id }));
    }
    navigate("/order-confirmation");
  };

  return (
    <>
      <div className="page-content">
        <BreadCrumb title={"CheckOut"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Select Delivery Address</h4>
              </div>
              <div>
                <Link
                  to="/buyerAddress"
                  className="btn btn-outline-dark btn-ecom"
                >
                  Add New Address
                </Link>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <h6 className="fw-bold mb-3 py-2 px-3 bg-light">
                  Please Carefully Select Address
                </h6>
                {address &&
                  address.map((user, indx) => {
                    return (
                      <div
                        className="card rounded-0 mb-3"
                        key={user.id || indx}
                        onClick={() => {
                          setSelectedAddress(user);
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex flex-column flex-xl-row gap-3">
                            <div className="address-info form-check flex-grow-1">
                              {selectedAddress?.id === user.id ? (
                                <i
                                  className="bi bi-check fw-bold "
                                  style={{
                                    position: "absolute",
                                    right: 0,
                                    fontSize: "60px",
                                  }}
                                ></i>
                              ) : null}
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                <span className="fw-bold mb-0 h5">
                                  {user?.name ?? ""}
                                </span>
                                <br />
                                <span className="text-dark fw-bold">
                                  {user?.address ?? ""},{user?.city ?? ""}
                                  <br />
                                  {user?.state ?? ""},{user?.pinCode ?? ""}
                                  <br />
                                  {user?.email ?? ""}
                                  <br />
                                </span>
                                <span className="text-dark fw-bold">
                                  {" "}
                                  Mobile &#128222;: +91-{user?.phone ?? ""}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div className="col-12 col-lg-12">
                  <div className="card rounded-0 payment-method">
                    <div className="row g-0">
                      <div className="col-12 col-lg-12  bg-light">
                        <div className="nav flex-column nav-pills">
                          <button
                            className="nav-link rounded-0"
                            style={{ height: "80px" }}
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-home"
                            type="button"
                            onClick={() => {
                              setMode("COD");
                            }}
                          >
                            <i className="bi bi-cash-stack me-2" />
                            Cash On Delivery
                            {mode === "COD" && (
                              <i
                                className="bi bi-check "
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  fontSize: "40px",
                                }}
                              />
                            )}
                          </button>
                          <button
                            className="nav-link rounded-0 border-bottom-0"
                            style={{ height: "80px" }}
                            id="v-pills-settings-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-settings"
                            type="button"
                            onClick={() => {
                              setMode("UPI");
                            }}
                          >
                            <i className="bi bi-bank2 me-2" />
                            Net Banking
                            {mode === "UPI" && (
                              <i
                                className="bi bi-check "
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  fontSize: "40px",
                                }}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div className="card rounded-0 mb-3">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">Order Summary</h5>
                    <table className="table table-bordered table-striped">
                      <thead className="table-dark text-center">
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {data?.map((x, indx) => {
                          return (
                            <tr key={x.id || indx}>
                              <td>{x?.name ?? ""}</td>
                              <td>{x?.finalPrice ?? ""}</td>
                              <td>{x?.quantity ?? ""}</td>
                              <td>
                                {(x?.finalPrice ?? 0) * (x?.quantity ?? 0)}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan="2" className="fw-bold text-dark ">
                            Total Product's Amount
                          </td>
                          <td
                            colSpan="2"
                            className="text-end fw-bold text-dar text-center"
                          >
                            ₹{finalCartPrise}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2" className="fw-bold text-dark ">
                            Delivery Charges
                          </td>
                          <td
                            colSpan="2"
                            className="text-end fw-bold text-dark text-center"
                          >
                            ₹29.00
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="fw-bold text-dark ">
                            Total Items Quantity
                          </td>
                          <td
                            colSpan="2"
                            className="text-end fw-bold text-dark text-center"
                          >
                            {cardQty}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="fw-bold text-dark ">
                            Final Amount
                          </td>
                          <td
                            colSpan="2"
                            className="text-end fw-bold text-dark text-center"
                          >
                            ₹{Math.round(finalCartPrise + 29)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="d-grid mt-4">
                      {data?.some((item) => item.stockQuantity === 0) ? (
                        <div className="d-grid mt-4 align-content-center">
                          <p className="mt-3 text-danger text-center fs-3">
                            One of Cart Item is out of Stock. Please Remove From
                            Cart
                          </p>
                          <br />
                          <button
                            style={{
                              margin: "0px 0px 0px 250px",
                              height: "50px",
                              width: "150px",
                              borderRadius: "5px",
                            }}
                          >
                            <Link to="/cart" className="fw-bolder">
                              Goto cart to Remove
                            </Link>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-dark btn-ecomm py-3 px-5"
                          onClick={() => placeOrder()}
                        >
                          Place Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
    </>
  );
}
