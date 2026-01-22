import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole = [] }) {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");
    const role = localStorage.getItem("role");

    if (!login) {
      navigate("/login");
      return;
    }

    if (requiredRole.length > 0 && !requiredRole.includes(role)) {
      navigate("/unauthorised");
    }
  }, [navigate, requiredRole]);

  return (
    <>
      <div className="page-content ">{children}</div>
    </>
  );
}
