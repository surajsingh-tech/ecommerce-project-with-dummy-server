import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getFeature,
  deleteFeature,
} from "../../../Redux/ActionCreators/FeatureActionCreator";

// to us dataTables.net
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdmineFeaturePage() {
  let featureStateData = useSelector((state) => state.FeatureStateData);
  let dispatch = useDispatch();
  let deleteAPI = (id) => {
    //data table k old cache data ko delete krne k liye
    if ($.fn.DataTable.isDataTable("#featureTable")) {
      $("#featureTable").DataTable().destroy();
    }
    if (confirm("Are You Sure ? Want To Delete Record")) {
      //server say item delete
      dispatch(deleteFeature({ id: id }));
      getAPIdata();
    }
  };

  const getAPIdata = () => {
    dispatch(getFeature());
  };
  useEffect(() => {
    getAPIdata();
  }, []);

  //for dataTables
  useEffect(() => {
    let timer;
    if (featureStateData) {
      // पहले check करें कि table पहले से initialized है
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#featureTable")) {
          $("#featureTable").DataTable().destroy(); // पुराना instance हटाएं
        }
        // नया instance initialize करें
        $("#featureTable").DataTable();
      }, 300);
    }
    // ✅ Cleanup function return करो
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [featureStateData]);
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
                Feature
                <Link to="/admin/featureCreatePage">
                  {" "}
                  <i className="bi bi-plus float-end text-light"></i>
                </Link>
              </h1>
              <div className="row">
                <div className="table-responsive">
                  {featureStateData ? (
                    <table className="table table-bordered" id="featureTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Icon</th>
                          <th>Short Description</th>
                          <th>Active</th>
                          <th>Edit</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {featureStateData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>
                                <span
                                  style={{
                                    border: "2px solid blue",
                                    padding: "4px",
                                    display: "inline-block",
                                  }}
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: item.icon,
                                    }}
                                  />
                                </span>
                              </td>
                              <td>{item.shortDescription}</td>
                              <td>{item.active ? "Yes" : "NO"}</td>
                              <td>
                                {" "}
                                <Link to={`/admin/feature/update/${item.id}`}>
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
