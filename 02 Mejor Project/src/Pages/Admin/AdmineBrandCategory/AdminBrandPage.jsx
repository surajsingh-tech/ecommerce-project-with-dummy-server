import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getBrand,
  deleteBrand,
} from "../../../Redux/ActionCreators/BrandActionCreator";

// to us dataTables.net
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdmineBrandPage() {
  let brandStateData = useSelector((state) => state.BrandStateData);
  let dispatch = useDispatch();
  let deleteAPI = (id) => {
    //data table k old cache data ko delete krne k liye
    if ($.fn.DataTable.isDataTable("#brandTable")) {
      $("#brandTable").DataTable().destroy();
    }
    if (confirm("Are You Sure ? Want To Delete Record")) {
      //server say item delete
      dispatch(deleteBrand({ id: id }));
      getAPIdata();
    }
  };

  const getAPIdata = () => {
    dispatch(getBrand());
  };
  useEffect(() => {
    getAPIdata();
  }, []);

  //for dataTables
  useEffect(() => {
    let timer;
    if (brandStateData) {
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#brandTable")) {
          $("#brandTable").DataTable().destroy();
        }
        $("#brandTable").DataTable();
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [brandStateData]);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h1 className="px-2 text-center bg-dark text-light">
                Brand
                <Link to="/admin/brandCreatePage">
                  {" "}
                  <i className="bi bi-plus float-end text-light"></i>
                </Link>
              </h1>
              <div className="row">
                <div className="table-responsive">
                  {brandStateData ? (
                    <table className="table table-bordered" id="brandTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Pic</th>
                          <th>Active</th>
                          <th>Edit</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brandStateData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>
                                <Link
                                  to={`${import.meta.env.VITE_SITE_SERVER}/brand/${item.pic}`}
                                >
                                  <img
                                    src={`${import.meta.env.VITE_SITE_SERVER}/brand/${item.pic}`}
                                    alt="image"
                                    width={60}
                                    height={60}
                                  />
                                </Link>
                              </td>
                              <td>{item.active ? "Yes" : "NO"}</td>
                              <td>
                                {" "}
                                <Link to={`/admin/brand/update/${item.id}`}>
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
