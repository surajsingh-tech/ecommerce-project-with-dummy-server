import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";

export default function OrderConfirmationPage() {
  return (
    <>
      <div className="page-content">
        <BreadCrumb title="Order Confirmation" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="separator mb-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Thank You!</h3>
              <div className="line" />
            </div>
            <div className="border p-4 text-center w-100">
              <h5 className="fw-bold mb-2">Thank You for Contacting us.</h5>
              <p className="my-2">
                Now Track Your Order from
                <Link to="/myorders" className="btn btn-outline-primary my-2">
                  Orders Page
                </Link>
              </p>
              <p className="mb-0">
                We have received your message. We will reply to you as soon as
                possible.
              </p>
              <Link to={"/shop"} className="btn btn-outline-primary mt-2">
                Shop More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
