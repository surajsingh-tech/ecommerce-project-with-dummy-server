import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import BuyersSideBar from "../Components/BuyersSideBar";

export default function ProfilePage() {
  let [data, setData] = useState({});

  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        let user = response?.find(
          (x) => x.id === localStorage.getItem("userid"),
        );
        setData(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Profile"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="w-100 text-center">
                <h4 className="mb-0 h4 fw-bold">Account - Profile</h4>
              </div>
            </div>
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>
            <div className="row">
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <BuyersSideBar />
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-9">
                <div className="card rounded-0">
                  <div className="card-body p-lg-5">
                    <h5 className="mb-0 fw-bold">Profile Details</h5>
                    <hr />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>Full Name</td>
                            <td>{data?.name}</td>
                          </tr>
                          <tr>
                            <td>Mobile Number</td>
                            <td>{data?.phone}</td>
                          </tr>
                          <tr>
                            <td>Email ID</td>
                            <td>{data?.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Link
                        to="/updateProfile"
                        className="btn btn-outline-dark btn-ecomm"
                      >
                        <i className="bi bi-pencil-fill me-2" />
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  );
}
