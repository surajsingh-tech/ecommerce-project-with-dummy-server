import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
export default function ErrorPage() {
  return (
    <>
      <div className="page-content">
        <BreadCrumb title={"Error"} />
        <div className="text-center fw-bold">
          <h4>OOPS !!!!</h4>
          <h5>404 Page not Found</h5>
        </div>
      </div>
    </>
  );
}
