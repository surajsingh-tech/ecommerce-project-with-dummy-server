import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getFAQ,
  deleteFAQ,
} from "../../../Redux/ActionCreators/MaincategoryFAQ";

// to us dataTables.net
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdmineFaqPage() {
  let faqStateData = useSelector((state) => state.FAQStateData);
  let dispatch = useDispatch();
  let deleteAPI = (id) => {
    //data table k old cache data ko delete krne k liye
    if ($.fn.DataTable.isDataTable("#faqTable")) {
      $("#faqTable").DataTable().destroy();
    }
    if (confirm("Are You Sure ? Want To Delete Record")) {
      //server say item delete
      dispatch(deleteFAQ({ id: id }));
      getAPIdata();
    }
  };

  const getAPIdata = () => {
    dispatch(getFAQ());
  };
  useEffect(() => {
    getAPIdata();
  }, []);

  //for dataTables
  useEffect(() => {
    let timer;
    if (faqStateData) {
      // पहले check करें कि table पहले से initialized है
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#faqTable")) {
          $("#faqTable").DataTable().destroy(); // पुराना instance हटाएं
        }
        // नया instance initialize करें
        $("#faqTable").DataTable();
      }, 300);
    }
    // ✅ Cleanup function return करो
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [faqStateData]);
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
                FAQ
                <Link to="/admin/faqCreatePage">
                  {" "}
                  <i className="bi bi-plus float-end text-light"></i>
                </Link>
              </h1>
              <div className="row">
                <div className="table-responsive">
                  {faqStateData ? (
                    <table className="table table-bordered" id="faqTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Active</th>
                          <th>Edit</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqStateData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.question}</td>
                              <td>{item.answer}</td>
                              <td>{item.active ? "Yes" : "NO"}</td>
                              <td>
                                {" "}
                                <Link to={`/admin/faq/update/${item.id}`}>
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
