import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  let navigate = useNavigate();
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let [errMsg, setErrMsg] = useState({
    username: "Username/Email Field is Mandatory",
    password: "Password Field is Mandatory",
  });
  let [showError, setShowError] = useState(false);

  let getInputData = (e) => {
    let { name, value } = e.target;
    value = value.trim();
    setShowError(false);
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  let postData = async (e) => {
    e.preventDefault();
    if (data.username === "" && data.password === "") {
      setShowError(true);
    } else if (data.username !== "" && data.password === "") {
      setShowError(true);
      setErrMsg({
        username: "",
        password: "Password Field is Mandatory",
      });
    } else if (data.username == "" && data.password !== "") {
      setShowError(true);
      setErrMsg({
        username: "Username/Email Field is Mandatory",
        password: "",
      });
    } else {
      try {
        let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        let item = response.find(
          (x) =>
            (x.username.toLowerCase() === data.username.toLowerCase() ||
              x.email.toLowerCase() === data.username.toLowerCase()) &&
            x.password === data.password,
        );
        let username = response.find(
          (x) =>
            x.username?.toLowerCase() === data.username?.toLowerCase() ||
            x.email?.toLowerCase() === data.username?.toLowerCase(),
        );
        let password = response.find((x) => x.password === data.password);

        if (item && item.active === true) {
          setShowError(false);
          localStorage.setItem("login", true);
          localStorage.setItem("name", item.name);
          localStorage.setItem("userid", item.id);
          localStorage.setItem("role", item.role);
          if (item.role === "Buyer") {
            navigate("/");
          } else if (item.role === "Admin" || item.role === "Super Admin") {
            navigate("/admin");
          }
        } else if (item && item.active === false) {
          setShowError(true);
          setErrMsg((pre) => ({
            ...pre,
            username:
              "Your Account Has Blocked Due To Some Unauthorized Action",
          }));
        } else if (!username && password) {
          setShowError(true);
          setErrMsg({
            username: "Invalid Username || Email",
            password: "",
          });
        } else if (!password && username) {
          setShowError(true);
          setErrMsg({
            username: "",
            password: " wrong Password",
          });
        } else {
          setShowError(true);
          setErrMsg({
            username: "Invalid Username || Email",
            password: " wrong Password",
          });
        }
      } catch (error) {
        console.log("error error", error);

        setShowError(true);
        setErrMsg((pre) => ({
          ...pre,
          username: "Server Error. Please try again later.",
        }));
      }
    }
  };
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Login"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">User Login</h4>
                    <hr />
                    <p className="mb-2 text-dark">Join / Sign In using</p>
                    <div className="social-login mb-4">
                      <div className="row g-4">
                        <div className="col-xl-6">
                          <a
                            href="https://www.facebook.com/login.php"
                            target="_blank"
                          >
                            <button
                              type="button"
                              className="btn bg-facebook btn-ecomm w-100 text-white"
                            >
                              <i className="bi bi-facebook me-2" />
                              Facebook
                            </button>
                          </a>
                        </div>
                        <div className="col-xl-6">
                          <a href=""></a>
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
                    <form
                      onSubmit={(e) => {
                        postData(e);
                      }}
                    >
                      <div className="row g-4 ">
                        <div className="col-12 ">
                          <label className="form-label text-dark">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            onChange={(e) => getInputData(e)}
                            placeholder="Enter Username/Email id"
                            className={`form-control rounded-0 ${errMsg.username && showError ? "border-danger" : ""}`}
                          />
                          {errMsg.username && showError ? (
                            <p className="text-danger">{errMsg.username}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-12 text-dark">
                          <label className="form-label text-dark">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            onChange={(e) => getInputData(e)}
                            placeholder="Enter Password"
                            className={`form-control rounded-0 ${errMsg.password && showError ? "border-danger" : ""}`}
                          />
                          {errMsg.password && showError ? (
                            <p className="text-danger">{errMsg.password}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-12">
                          <a
                            href="/forgetPassword"
                            className="text-content btn bg-light rounded-0 w-100"
                          >
                            <i className="bi bi-lock me-2" /> Forgot Password
                          </a>
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Don't have an account?{" "}
                            <Link to="/signUP" className="text-danger">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </div>
                      {/*-end row*/}
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
