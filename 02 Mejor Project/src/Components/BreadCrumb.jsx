import React from "react";
import { Link } from "react-router-dom";
export default function BreadCrumb({ title }) {
  return (
    <>
      {/*start breadcrumb*/}
      <div className="py-4 border-bottom  mt-5">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <li className="breadcrumb-item">
                <Link to="/" className=" text-primary fw-bold">
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-dark fw-bold"
                aria-current="page"
              >
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/*end breadcrumb*/}
    </>
  );
}
