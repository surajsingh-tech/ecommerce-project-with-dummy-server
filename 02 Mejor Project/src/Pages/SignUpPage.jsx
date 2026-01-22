import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../Validators/FormValidator";

export default function SignUpPage() {
  let navigate = useNavigate();

  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    cnfpassword: "",
    agree: false,
  });
  let [showError, setShowError] = useState(false);
  let [error, setError] = useState({
    name: "name Field is Mandatory",
    username: "username Field is Mandatory",
    phone: "phone Field is Mandatory",
    email: "email Field is Mandatory",
    password: "password Field is Mandatory",
    cnfpassword: "Confirm password Field is Mandatory",
    agree: "Please Give Your consent for Login",
  });

  let getInputData = (e) => {
    // e.preventDefault()
    let { name, value, checked } = e.target;
    value = value.trim();
    setError((pre) => {
      return {
        ...pre,
        [name]:
          name === "agree"
            ? checked
              ? ""
              : "Please Give Your consent for Login"
            : FormValidator(e),
      };
    });

    setData((pre) => ({
      ...pre,
      [name]: name === "agree" ? checked : value,
    }));
  };

  let postData = async (e) => {
    e.preventDefault();
    let chkError = Object.values(error).find((err) => err !== "");
    if (chkError) {
      setShowError(true);
    } else if (data.password !== data.cnfpassword) {
      setShowError(true);
      setError((pre) => ({
        ...pre,
        cnfpassword: "Password Not Match",
      }));
    } else {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      let user = response.find(
        (x) =>
          x.username?.toLowerCase() === data.username.toLowerCase() ||
          x.email?.toLowerCase() === data.email.toLowerCase(),
      );
      if (user) {
        setShowError(true);
        setError((pre) => ({
          ...pre,
          username: "UserName Already Exist",
          email: "E-Mail Already Exist",
        }));
      } else {
        let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: "Buyer",
            active: true,
          }),
        });
        response = await response.json();
        navigate("/login");
      }
    }
  };

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Create New Account"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-8 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">Registration</h4>
                    <hr />
                    <p className="mb-2 text-dark">Join / Sign Up using</p>
                    <div className="social-login mb-4">
                      <div className="row g-4">
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-facebook btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-facebook me-2" />
                            Facebook
                          </button>
                        </div>
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-pinterest btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-google me-2" />
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="separator mb-4">
                      <div className="line" />
                      <p className="mb-0 fw-bold">Or</p>
                      <div className="line" />
                    </div>
                    <form onSubmit={(e) => postData(e)}>
                      <div className="row g-4">
                        {/* Name */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">Name</label>
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.name ? "border-danger" : "border-dark"}`}
                              name="name"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.name ? (
                            <p className="text-danger">{error.name}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Username */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">UserName</label>
                            <input
                              type="text"
                              placeholder="Choose a username"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.username ? "border-danger" : "border-dark"}`}
                              name="username"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.username ? (
                            <p className="text-danger">{error.username}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Mobile */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">Mobile</label>
                            <input
                              type="number"
                              placeholder="Enter mobile number"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.phone ? "border-danger" : "border-dark"}`}
                              name="phone"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.phone ? (
                            <p className="text-danger">{error.phone}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Email */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">Email ID</label>
                            <input
                              type="text"
                              placeholder="Enter email address"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.email ? "border-danger" : "border-dark"}`}
                              name="email"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.email ? (
                            <p className="text-danger">{error.email}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Password */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">Password</label>
                            <input
                              type="password"
                              placeholder="Create a password"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.password ? "border-danger" : "border-dark"}`}
                              name="password"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.password ? (
                            <p className="text-danger">{error.password}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <label className="text-dark">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              placeholder="Re-enter password"
                              className={`form-label text-dark me-2 mb-0 mx-1 w-100 ${showError && error.cnfpassword ? "border-danger" : "border-dark"}`}
                              name="cnfpassword"
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                          {showError && error.cnfpassword ? (
                            <p className="text-danger">{error.cnfpassword}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Terms */}
                        <div className="col-12">
                          <div className="form-check">
                            <label
                              htmlFor="flexCheckDefault"
                              className={`text-dark`}
                            >
                              I agree to Terms and Conditions
                            </label>
                            <input
                              name="agree"
                              onChange={(e) => getInputData(e)}
                              className={`form-check-input ${showError && error.agree ? "border-danger" : "border-dark"}`}
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                          </div>
                          {showError && error.agree ? (
                            <p className="text-danger">{error.agree}</p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="col-12">
                          <hr className="my-0" />
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Sign Up
                          </button>
                        </div>

                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Already have an account?{" "}
                            <Link to="/login" className="text-danger">
                              Log In
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
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
