import React, { useEffect, useState } from "react";
import { getNewsletter } from "../Redux/ActionCreators/NewsletterActionCreator";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../Components/BreadCrumb";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ShownewsLetterPage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [newsLetter, setNewsLetter] = useState([]);
  let newsLetterStateData = useSelector((x) => x.NewsletterStateData);

  useEffect(() => {
    setNewsLetter(newsLetterStateData);
  }, [newsLetterStateData]);

  useEffect(() => {
    dispatch(getNewsletter());
  }, [dispatch]);

  return (
    <div className="mt-4 mb-4">
      <BreadCrumb title={"Admin Newsletter Show Page"} />

      <div className="page-content container mt-4">
        {/* Heading + Back Button in one row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="newsletter-title">📧 Newsletter Subscribers</h2>
          <button
            className="btn btn-outline-secondary d-flex align-items-center bg-black"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2 " /> Back
          </button>
        </div>

        {/* Stylish Table */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>
                  <i className="fa fa-id-card"></i> ID
                </th>
                <th>
                  <i className="fa fa-at"></i> Email
                </th>
                <th>
                  <i className="fa fa-toggle-on"></i> Status
                </th>
              </tr>
            </thead>
            <tbody>
              {newsLetter.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td>{subscriber.id}</td>
                  <td>{subscriber.email}</td>
                  <td>
                    <span
                      className={`badge ${subscriber.active ? "bg-success" : "bg-danger"}`}
                    >
                      {subscriber.active ? "Active ✅" : "Inactive ❌"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
