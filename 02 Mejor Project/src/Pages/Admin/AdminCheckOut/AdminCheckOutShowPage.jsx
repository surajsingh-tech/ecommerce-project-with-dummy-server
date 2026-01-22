import React, { useEffect, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getCheckout,
  updateCheckout,
} from "../../../Redux/ActionCreators/CheckoutActionCreator";

export default function AdminCheckOutShowPage() {
  let [checkOut, setCheckOut] = useState({});
  let navigate = useNavigate();
  let CheckOutStateData = useSelector((state) => state.CheckoutStateData);
  let dispatch = useDispatch();
  let { id } = useParams();
  let [subTotal, setSubTotal] = useState();

  let updateRecord = async (id) => {
    if (confirm("Are You Sure to Update Status of That Item ")) {
      await dispatch(updateCheckout({ ...checkOut }));
      navigate("/admin/checkout");
    }
  };

  useEffect(() => {
    dispatch(getCheckout());
  }, []);

  useEffect(() => {
    let x = CheckOutStateData.find((x) => x.id === id);
    if (x) {
      let subtotal = x?.product?.reduce((acc, pro) => {
        return acc + (pro?.finalPrice ?? 0) * (pro?.quantity ?? 0);
      }, 0);
      setCheckOut(x);
      setSubTotal(subtotal);
    }
  }, [CheckOutStateData]);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className="bg-dark text-white p-2 text-center">
                ContactUs Query
              </h5>
              <div className="row">
                <div className="table-responsive">
                  {checkOut ? (
                    <table className="table table-bordered text-center custom-checkout-table">
                      <tbody>
                        <tr>
                          <th>Id</th>
                          <td>{checkOut?.id ?? ""}</td>
                        </tr>
                        <tr>
                          <th>User</th>
                          <td>{checkOut?.user?.name ?? ""}</td>
                        </tr>
                        <tr>
                          <th style={{ width: "30%" }}>Order Status</th>
                          <td style={{ width: "70%" }}>
                            <select
                              className="form-select text-center"
                              value={checkOut?.orderStatus ?? ""}
                              onChange={(e) =>
                                setCheckOut({
                                  ...checkOut,
                                  orderStatus: e.target.value,
                                })
                              }
                            >
                              <option value="" hidden>
                                -- Select Status --
                              </option>
                              <option value="Order is Placed">
                                Order is Placed
                              </option>
                              <option value="Order is Packed">
                                Order is Packed
                              </option>
                              <option value="Order is Ready to ship">
                                Order is Ready to ship
                              </option>
                              <option value="Order is Shipped">
                                Order is Shipped
                              </option>
                              <option value="Order is in Transit">
                                Order is in Transit
                              </option>
                              <option value="Order is Reached to the Final Delivery">
                                Order is Reached to the Final Delivery
                              </option>
                              <option value="Order is Out for Delivery">
                                Order is Out for Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th>Payment Mode</th>
                          <td>{checkOut?.paymentMode ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Payment Status</th>
                          <td>
                            {checkOut?.paymentStatus ?? ""}
                            {checkOut?.paymentStatus !== "Done" ? (
                              <select
                                onChange={(e) =>
                                  setCheckOut({
                                    ...checkOut,
                                    paymentStatus: e.target.value,
                                  })
                                }
                                value={checkOut?.paymentStatus ?? ""}
                                className="form-select border-dark mt-3"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                              </select>
                            ) : null}
                          </td>
                        </tr>
                        <tr>
                          <th>SubTotal</th>
                          <td> &#x20B9; {subTotal ?? 0}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td> &#x20B9; {29}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>&#x20B9; {(subTotal ?? 0) + 29}</td>
                        </tr>
                        <tr>
                          <th>RPPID</th>
                          <td>N/A</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <button
                              onClick={() => updateRecord(checkOut.id)}
                              className="btn btn-dark w-100"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center">There is no data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
