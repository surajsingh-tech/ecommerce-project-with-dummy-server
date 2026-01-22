import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="list-group">
        <Link
          to="/admin"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-house text-light float-start me-4"></i>
          <span>Home</span>
        </Link>
        <Link
          to="/admin/maincategory"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-grid text-light float-start me-4"></i>
          <span>Maincategory</span>
        </Link>
        <Link
          to="/admin/subcategory"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-list-ul text-light float-start me-4"></i>
          <span>Subcategory</span>
        </Link>
        <Link
          to="/admin/brand"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-tags text-light float-start me-4"></i>
          <span>Brand</span>
        </Link>
        <Link
          to="/admin/product"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-box-seam text-light float-start me-4"></i>
          <span>Product</span>
        </Link>
        <Link
          to="/admin/user"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-person text-light float-start me-4"></i>
          <span>User's</span>
        </Link>
        <Link
          to="/admin/newsletter/show"
          className="list-group-item list-group-item-action active bg-dark text-center"
        >
          <i className="bi bi-envelope-fill text-light float-start me-4"></i>
          <span>Newsletter</span>
        </Link>
        <Link
          to="/admin/checkout"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-receipt text-light float-start me-4"></i>
          <span>Checkout</span>
        </Link>
        <Link
          to="/admin/contactus"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-telephone text-light float-start me-4"></i>
          <span>ContactUs</span>
        </Link>
        <Link
          to="/admin/feature"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-stars text-light float-start me-4"></i>
          <span>Features</span>
        </Link>

        <Link
          to="/admin/setting"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-gear text-light float-start me-4"></i>
          <span>Setting</span>
        </Link>
        <Link
          to="/admin/fAQ"
          className="list-group-item list-group-item-action active bg-dark text-center"
          aria-current="true"
        >
          <i className="bi bi-question-circle text-light float-start me-4"></i>
          <span>FAQ</span>
        </Link>
      </div>
    </>
  );
}
