import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function BuyersSideBar() {
  let navigate = useNavigate();
  let logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="offcanvas-body account-menu ">
      <div className="list-group w-100 rounded-0 border border-dark ">
        <NavLink
          to="/dashBoard"
          className={({ isActive }) =>
            `list-group-item  border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-house-door me-2" />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `list-group-item  border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-person me-2" />
          Profile
        </NavLink>

        <NavLink
          to="/updateProfile"
          className={({ isActive }) =>
            `list-group-item border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-pencil me-2" />
          Edit Profile
        </NavLink>

        <NavLink
          to="/buyerAddress"
          className={({ isActive }) =>
            `list-group-item border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-pin-map me-2" />
          Buyer's Address
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `list-group-item border border-dark  ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-cart4 me-2" />
          Cart
        </NavLink>

        <NavLink
          to="/myorders"
          className={({ isActive }) =>
            `list-group-item border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-receipt-cutoff me-2" />
          Orders
        </NavLink>

        <NavLink
          to="/wishList"
          className={({ isActive }) =>
            `list-group-item border border-dark ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-suit-heart me-2" />
          Wishlist
        </NavLink>

        <button
          type="button"
          className="list-group-item border border-dark"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
