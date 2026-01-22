import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../Validators/FormValidator";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  let [data, setData] = useState({
    email: "",
    phone: "",
    username: "",
  });

  let [errMsg, setErrMsg] = useState({});

  let [showError, setShowError] = useState(false);

  let [pass, setPass] = useState({
    newpass: "",
    cnfpassword: "",
  });
  let [returnlogin, setReturnLog] = useState(false);
  let [resetErr, setResetErr] = useState({
    newpass: "Field is Mandatory",
    cnfpassword: "Field is Mandatory",
  });

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
    let fieldEmptyErrMsg = {};

    if (!data.email || data.email.trim() === "") {
      fieldEmptyErrMsg.email = "email Field is Mandatory";
    }
    if (!data.phone || data.phone.trim() === "") {
      fieldEmptyErrMsg.phone = "phone Field is Mandatory";
    }
    if (!data.username || data.username.trim() === "") {
      fieldEmptyErrMsg.username = "Username Field is Mandatory";
    }

    if (Object.keys(fieldEmptyErrMsg).length > 0) {
      setShowError(true);
      setErrMsg(fieldEmptyErrMsg);
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
            x.email?.toLowerCase() === data.email?.toLowerCase() &&
            x?.username.toLowerCase() === data?.username.toLowerCase() &&
            x?.phone === data?.phone,
        );
        let email = response.find(
          (x) => x.email?.toLowerCase() === data.email?.toLowerCase(),
        );
        let phone = response.find((x) => x?.phone === data?.phone);
        let username = response.find(
          (x) => x.username?.toLowerCase() === data.username?.toLowerCase(),
        );

        if (item && item.active === true) {
          setShowError(false);
          setShowReset(true);
          console.log("Here");
        } else {
          let errors = {};

          if (!email) {
            errors.email = "Invalid Email";
          }
          if (!phone) {
            errors.phone = "Invalid Phone Number try again";
          }
          if (!username) {
            errors.username = "Invalid Username";
          }

          if (Object.keys(errors).length > 0) {
            setShowError(true);
            setErrMsg(errors);
          } else {
            setShowError(false);
          }
        }
      } catch (error) {
        setShowError(true);
        setErrMsg({
          username: "Server Error. Please try again later.",
        });
      }
    }
  };

  let resetPassword = async (e) => {
    let { name, value } = e.target;
    value = value.trim();
    setShowError(false);
    setResetErr((pre) => ({
      ...pre,
      [name]: FormValidator(e),
    }));

    setPass((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  let postResPass = async (e) => {
    e.preventDefault();
    let chkError = Object.values(resetErr).find((e) => e !== "");
    if (chkError) {
      setShowError(true);
    } else if (pass.newpass !== pass.cnfpassword) {
      setShowError(true);
      setResetErr({
        newpass: "",
        cnfpassword: "Password not Match",
      });
    } else {
      try {
        let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let users = await response.json();
        let user = users.find(
          (x) => x.email?.toLowerCase() === data.email.toLowerCase(),
        );

        if (user) {
          // Partial update with PATCH
          let response = await fetch(
            `${import.meta.env.VITE_SITE_SERVER}/user/${user.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password: pass.newpass,
              }),
            },
          );

          response = await response.json();
          setPass({
            newpass: "",
            cnfpassword: "",
          });
          toast.success("Password Successfully Changed!");
          setReturnLog(true);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };
  return (
    <>
      {showReset ? (
        <div className="page-content">
          <BreadCrumb title={"Reset Password"} />
          {/*start product details*/}
          {returnlogin ? (
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-center"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Return to Login
              </button>
            </div>
          ) : (
            <section className="py-5">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                    <div className="card rounded-0">
                      <div className="w-100 text-center">
                        <h4 className="mb-4 fw-bold text-center">
                          Reset Password
                        </h4>
                        <form onSubmit={(e) => postResPass(e)}>
                          <div className="row g-4">
                            <div className="col-12">
                              <label
                                htmlFor="exampleNewPassword"
                                className="form-label text-dark"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                name="newpass"
                                className={`form-control rounded-0 ${resetErr.newpass && showError ? "border-danger" : ""}`}
                                value={pass.newpass}
                                onChange={(e) => resetPassword(e)}
                                id="exampleNewPassword"
                              />
                              {resetErr.newpass && showError ? (
                                <p className="text-danger">
                                  {resetErr.newpass}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor="examplePassword"
                                className="form-label text-dark"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                name="cnfpassword"
                                className={`form-control rounded-0 ${resetErr.cnfpassword && showError ? "border-danger" : ""}`}
                                value={pass.cnfpassword}
                                onChange={(e) => resetPassword(e)}
                                id="exampleNewPassword"
                              />
                              {resetErr.cnfpassword && showError ? (
                                <p className="text-danger">
                                  {resetErr.cnfpassword}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-12">
                              <button
                                type="submit"
                                className="btn btn-dark rounded-0 btn-ecomm w-100 "
                              >
                                Change Password
                              </button>
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
          )}
          {/*start product details*/}
        </div>
      ) : (
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
                      <p className="mb-2">Join / Sign In using</p>
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
                      <form
                        onSubmit={(e) => {
                          postData(e);
                        }}
                      >
                        <div className="row g-4">
                          <div className="col-12">
                            <label className="form-label text-dark">
                              Username
                            </label>
                            <input
                              type="text"
                              name="username"
                              onChange={(e) => getInputData(e)}
                              placeholder="Enter Your Username"
                              className={`form-control rounded-0 ${errMsg?.username && showError ? "border-danger" : ""}`}
                            />
                            {errMsg?.username && showError ? (
                              <p className="text-danger">{errMsg?.username}</p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12">
                            <label className="form-label text-dark">
                              Email
                            </label>
                            <input
                              type="text"
                              name="email"
                              onChange={(e) => getInputData(e)}
                              placeholder="Enter Your Valid Email id"
                              className={`form-control rounded-0 ${errMsg?.email && showError ? "border-danger" : ""}`}
                            />
                            {errMsg?.email && showError ? (
                              <p className="text-danger">{errMsg?.email}</p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12">
                            <label className="form-label text-dark">
                              Phone Number
                            </label>
                            <input
                              type="number"
                              name="phone"
                              onChange={(e) => getInputData(e)}
                              placeholder="Enter Valid Phone Number"
                              className={`form-control rounded-0 ${errMsg?.phone && showError ? "border-danger" : ""}`}
                            />
                            {errMsg?.phone && showError ? (
                              <p className="text-danger">{errMsg?.phone}</p>
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
                              Send
                            </button>
                          </div>
                          <div className="col-12 text-center">
                            <p
                              className="mb-0 rounded-0 w-100 btn btn-ecomm border border-dark"
                              onClick={() => navigate("/login")}
                            >
                              <i className="bi bi-arrow-left me-2" /> Return to
                              Login
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
      )}
    </>
  );
}
