import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getContact,
  deleteContact,
  updateContact,
} from "../../../Redux/ActionCreators/ContactUsActionCreator";

export default function AdminContactUsShowPage() {
  let [contactData, setContactData] = useState(null);
  let [flag, setFlag] = useState(false);
  let ContactUsStateData = useSelector(
    (state) => state.ContactReducerStateData,
  );
  let dispatch = useDispatch();
  let { id } = useParams();

  let deleteRecord = (id) => {
    if (confirm("Are You Sure to Delete That Item ? ")) {
      dispatch(deleteContact({ id }));
      dispatch(getContact());
    }
  };

  let updateRecord = (id) => {
    if (confirm("Are You Sure to Update Status of That Item ")) {
      contactData.active = !contactData.active;
      dispatch(updateContact({ ...contactData }));
      setFlag(!flag);
    }
  };

  useEffect(() => {
    dispatch(getContact());
  }, []);

  useEffect(() => {
    let x = ContactUsStateData.find((x) => x.id === id);
    if (x) {
      setContactData(x);
    }
  }, [ContactUsStateData]);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <h5 className="bg-dark text-white p-2 text-center">
                ContactUs Query
              </h5>
              <div className="row">
                <div className="table-responsive">
                  {contactData ? (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>Id</th>
                          <td>{contactData?.id ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <td>{contactData?.name ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Email Address</th>
                          <td>{contactData?.email ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{contactData?.phone ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Subject</th>
                          <td>{contactData?.subject ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Message</th>
                          <td>{contactData?.message ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Active</th>
                          <td>{contactData?.active ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>
                            {contactData?.date
                              ? new Date(contactData.date).toLocaleDateString()
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            {contactData?.active ? (
                              <button
                                onClick={() => updateRecord(contactData.id)}
                                className="btn btn-dark w-100"
                              >
                                Update
                              </button>
                            ) : (
                              <button
                                onClick={() => deleteRecord(contactData.id)}
                                className="btn btn-danger w-100"
                              >
                                Delete
                              </button>
                            )}
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
