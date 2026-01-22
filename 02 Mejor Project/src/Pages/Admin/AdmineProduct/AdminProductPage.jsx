import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  deleteProduct,
} from "../../../Redux/ActionCreators/ProductActionCreator";

// to us dataTables.net
import $, { data } from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdmineProductPage() {
  let productStateData = useSelector((state) => state.ProductStateData);

  let dispatch = useDispatch();
  let deleteAPI = (id) => {
    //data table k old cache data ko delete krne k liye
    if ($.fn.DataTable.isDataTable("#productTable")) {
      $("#productTable").DataTable().destroy();
    }
    if (confirm("Are You Sure ? Want To Delete Record")) {
      //server say item delete
      dispatch(deleteProduct({ id: id }));
      getAPIdata();
    }
  };

  //For Show Data
  const getAPIdata = () => {
    dispatch(getProduct());
  };
  useEffect(() => {
    getAPIdata();
  }, [productStateData]);

  //for dataTables
  useEffect(() => {
    let timer;
    if (productStateData) {
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#productTable")) {
          $("#productTable").DataTable().destroy();
        }
        $("#productTable").DataTable();
      }, 300);
    }
    // Cleanup function
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [productStateData]);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <h1 className="px-2 text-center bg-dark text-light">
                Product
                <Link to="/admin/productCreatePage">
                  {" "}
                  <i className="bi bi-plus float-end text-light"></i>
                </Link>
              </h1>
              <div className="row">
                <div className="table-responsive">
                  {productStateData ? (
                    <table className="table table-bordered" id="productTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>MainCategory</th>
                          <th>SubCategory</th>
                          <th>Brand</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>BasePrice</th>
                          <th>Discount</th>
                          <th>Final Price</th>
                          <th>Stock</th>
                          <th>StockQuantity</th>
                          <th>Pics</th>
                          <th>Active</th>
                          <th>Edit</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productStateData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.maincategory}</td>
                              <td>{item.subcategory}</td>
                              <td>{item.brand}</td>
                              <td>{item.color.join()}</td>
                              <td>{item.size.join()}</td>
                              <td>&#8377;{item.basePrice}</td>
                              <td>{item.discount}</td>
                              <td>&#8377;{item.finalPrice}</td>
                              <td>
                                {item.stock == "In Stock" ? "Yes" : "NO "}
                              </td>
                              <td>{item.stockQuantity}</td>
                              <td>
                                <div style={{ width: "300px" }}>
                                  {item.pic &&
                                    item.pic.map((pic, indx) => (
                                      <Link
                                        key={indx}
                                        style={{
                                          display: "inline-block",
                                          marginRight: "5px",
                                        }}
                                        to={`${import.meta.env.VITE_SITE_SERVER}/product/${pic}`}
                                      >
                                        <img
                                          src={`${import.meta.env.VITE_SITE_SERVER}/product/${pic}`}
                                          alt="image"
                                          width={60}
                                          height={60}
                                        />
                                      </Link>
                                    ))}
                                </div>
                              </td>
                              <td>{item.active ? "Yes" : "NO"}</td>
                              <td>
                                {" "}
                                <Link to={`/admin/Product/update/${item.id}`}>
                                  <i className="btn btn-primary bi bi-pencil-square" />
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    deleteAPI(item.id);
                                  }}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    padding: 0,
                                  }}
                                >
                                  <i className=" btn btn-danger bi bi-trash" />
                                </button>
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
