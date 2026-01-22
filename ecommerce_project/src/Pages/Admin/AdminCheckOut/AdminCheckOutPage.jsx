import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreator";

// to us dataTables.net
import $, { data } from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdminCheckOutPage() {
  let [checkOut, setCheckOut] = useState([]);
  let CheckOutStateData = useSelector((state) => state.CheckoutStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheckout());
  }, []);

  useEffect(() => {
    setCheckOut(CheckOutStateData);
  }, [CheckOutStateData]);

  //for dataTables
  useEffect(() => {
    let timer;
    if (checkOut) {
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#productTable")) {
          $("#productTable").DataTable().destroy();
        }
        $("#productTable").DataTable();
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [checkOut]);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <h5 className="bg-dark text-white p-2 text-center">ContactUs</h5>
              <div className="row">
                <div className="table-responsive">
                  {checkOut ? (
                    <table className="table table-bordered" id="productTable">
                      <thead className="text-center text-dark  fw-bold">
                        <tr>
                          <th>ID</th>
                          <th>User Id</th>
                          <th>Order Status</th>
                          <th>Payment Mode</th>
                          <th>Payment Status</th>
                          <th>Subtotal</th>
                          <th>Shipping</th>
                          <th>Total</th>
                          <th>Date</th>
                          <th>Show</th>
                        </tr>
                      </thead>
                      <tbody className="text-center text-dark fw-bold">
                        {checkOut?.map((item, indx) => {
                          let subTotal = item?.product.reduce((acc, cur) => {
                            return (
                              acc +
                              (cur?.finalPrice ?? 0) * (cur?.quantity ?? 0)
                            );
                          }, 0);
                          let total = subTotal + 29;
                          return (
                            <tr key={item.id || indx}>
                              <td>{item.id}</td>
                              <td>{item?.user?.id ?? ""}</td>
                              <td>{item?.orderStatus ?? ""}</td>
                              <td>{item?.paymentMode ?? ""}</td>
                              <td>{item?.paymentStatus ?? ""}</td>
                              <td> &#x20B9;{subTotal ?? ""}</td>
                              <td className="text-center"> &#x20B9;{29}</td>
                              <td> &#x20B9;{total}</td>
                              <td>
                                {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/checkout/show/${item.id}`}
                                  className="d-flex align-items-center justify-content-center border border-dark rounded text-dark bg-black "
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    margin: "0 auto",
                                  }}
                                >
                                  <i className="bi bi-eye text-primary"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
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
