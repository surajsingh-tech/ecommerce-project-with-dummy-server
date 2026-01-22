import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getContact,
  deleteContact,
  updateContact,
} from "../../../Redux/ActionCreators/ContactUsActionCreator";

// to us dataTables.net
import $, { data } from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdminContactUsPage() {
  let [contactData, setContactData] = useState([]);
  let [flag, setFlag] = useState(false);
  let ContactUsStateData = useSelector(
    (state) => state.ContactReducerStateData,
  );
  let dispatch = useDispatch();

  let deleteRecord = (id) => {
    if (confirm("Are You Sure to Delete That Item ? ")) {
      dispatch(deleteContact({ id }));
      dispatch(getContact());
    }
  };

  let updateRecord = (id) => {
    if (confirm("Are You Sure to Update Status of That Item ")) {
      let item = contactData.find((x) => x.id === id);
      let index = contactData.findIndex((x) => x.id === id);
      item.active = !item.active;
      contactData[index].active = item.active;
      dispatch(updateContact({ ...contactData[index] }));
      setFlag(!flag);
    }
  };

  useEffect(() => {
    dispatch(getContact());
  }, []);

  useEffect(() => {
    setContactData(ContactUsStateData);
  }, [ContactUsStateData]);

  //for dataTables
  useEffect(() => {
    let timer;
    if (contactData) {
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
  }, [contactData]);
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
                  {contactData ? (
                    <table className="table table-bordered" id="productTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Active</th>
                          <th>View</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>{item.subject}</td>
                              <td>{item.message}</td>
                              <td>
                                {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                onClick={() => updateRecord(item.id)}
                              >
                                {item.active ? "Yes" : "NO"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/contactus/show/${item.id}`}
                                  className="bi bi-dark"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>
                              </td>
                              <td>
                                {item.active ? null : (
                                  <button
                                    onClick={() => deleteRecord(item.id)}
                                    className="btn btn-danger"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                )}
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
