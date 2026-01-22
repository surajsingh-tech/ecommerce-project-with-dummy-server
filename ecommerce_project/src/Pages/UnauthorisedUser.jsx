import React from "react";
import BreadCrumb from "../Components/BreadCrumb";

export default function UnauthorisedUser() {
  return (
    <>
      <div className="page-content">
        <BreadCrumb title={"Unauthorized"} />
        <div className="text-center fw-bold mt-5">
          <h4>🚫 Access Denied</h4>
          <h5>You are not authorized to view this page.</h5>
          <p className="text-muted mt-3">
            Please login with the correct role or go back to the homepage.
          </p>
          <a href="/" className="btn btn-dark mt-3">
            Go to Home
          </a>
        </div>
      </div>
    </>
  );
}
