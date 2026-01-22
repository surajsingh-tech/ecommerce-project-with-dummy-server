import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import BuyersSideBar from "../Components/BuyersSideBar";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../Validators/FormValidator";

export default function UpdateProfile() {
  let userId = localStorage.getItem("userid");
  let navigate = useNavigate();
  let [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  let [showError, setShowError] = useState(false);

  let [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  let getInputData = (e) => {
    // e.preventDefault()
    let { name, value } = e.target;
    setError((pre) => {
      return { ...pre, [name]: FormValidator(e) };
    });
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  let postData = async (e) => {
    e.preventDefault();
    try {
      let chkError = Object.values(error).find((err) => err !== "");

      if (chkError) {
        setShowError(true);
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
            userId !== x.id &&
            x.email?.toLowerCase() === data.email.toLowerCase(),
        );
        if (user) {
          setShowError(true);
          setError((pre) => ({
            ...pre,
            email: "E-Mail Already Exist",
          }));
        } else {
          setShowError(false);

          let response = await fetch(
            `${import.meta.env.VITE_SITE_SERVER}/user/${userId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
              }),
            },
          );
          response = await response.json();
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log("Somthing went Wrong", error);
    }
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
        let user = response?.find((x) => x.id === userId);
        if (user) {
          setData(user);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //For Password Field
  let [Password, setPassword] = useState({
    oldPass: "",
    newPass: "",
    cnfNewPass: "",
  });

  let [passErr, setPassErr] = useState({
    oldPass: "Field is Mandatory",
    newPass: "newPass Field is Mandatory",
    cnfNewPass: "Field is Mandatory",
  });

  let getPass = (e) => {
    let { name, value } = e.target;

    setPassErr((pre) => ({
      ...pre,
      [name]: name !== "oldPass" ? FormValidator(e) : "",
    }));

    setPassword((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  let changePassword = async (e) => {
    e.preventDefault();
    let chkERR = Object.values(passErr).find((x) => x !== "");
    if (chkERR) {
      setShowError(true);
    } else {
      try {
        let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        let user = response.find((x) => userId === x.id);
        let userPass = user.password;
        if (userPass === Password.oldPass) {
          if (Password.oldPass === Password.newPass) {
            setShowError(true);
            setPassErr((pre) => ({
              ...pre,
              newPass: "Don't use Previous Password",
            }));
          } else if (Password.cnfNewPass !== Password.newPass) {
            setShowError(true);
            setPassErr((pre) => ({
              ...pre,
              cnfNewPass: "Password not Match",
            }));
          } else {
            setShowError(false);
            try {
              let response = await fetch(
                `${import.meta.env.VITE_SITE_SERVER}/user/${userId}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    password: Password.newPass,
                  }),
                },
              );
              response = await response.json();
              navigate("/dashBoard");
            } catch (error) {
              console.log("Somthing went Wrong", error);
            }
          }
        } else {
          setShowError(true);
          setPassErr((pre) => ({
            ...pre,
            oldPass: "Wrong Password",
          }));
        }
      } catch (err) {
        console.log("Somthing went wrong in server", err);
      }
    }
  };

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Update Profile"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="w-100 text-center">
                <h4 className="mb-0 h4 fw-bold">Update Profile</h4>
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
              <div className="col-12 col-xl-7">
                <div className="card rounded-0">
                  <div className="card-body p-lg-5">
                    <form
                      onSubmit={(e) => {
                        postData(e);
                      }}
                    >
                      <div className="row row-cols-1 g-3">
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control rounded-0 ${error.name && showError ? "border-danger" : "border-dark"}`}
                              name="name"
                              placeholder="Email"
                              defaultValue={data.name}
                              onChange={(e) => getInputData(e)}
                            />
                            <label className="text-dark" htmlFor="name">
                              Name
                            </label>
                            {error.name && showError ? (
                              <p className="text-danger">{error.name}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control rounded-0 ${error.phone && showError ? "border-danger" : "border-dark"}`}
                              name="phone"
                              placeholder="Email"
                              defaultValue={data.phone}
                              onChange={(e) => getInputData(e)}
                            />
                            <label className="text-dark" htmlFor="phone">
                              {" "}
                              Mobile Number
                            </label>
                            {error.phone && showError ? (
                              <p className="text-danger">{error.phone}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control rounded-0 ${error.email && showError ? "border-danger" : "border-dark"}`}
                              name="email"
                              placeholder="Email"
                              defaultValue={data.email}
                              onChange={(e) => getInputData(e)}
                            />
                            <label className="text-dark" htmlFor="email">
                              Email
                            </label>
                            {error.email && showError ? (
                              <p className="text-danger">{error.email}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              name="address"
                              placeholder="Residential Address"
                              defaultValue={data.address}
                              onChange={(e) => getInputData(e)}
                            />
                            <label className="text-dark" htmlFor="address">
                              Address
                            </label>
                            {error.address && showError ? (
                              <p className="text-danger">{error.address}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-dark py-3 btn-ecomm w-100"
                          >
                            Save Details
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-outline-dark py-3 btn-ecomm w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#ChangePasswordModal"
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
        {/*start product details*/}
        {/* Change Password Modal */}
        <div className="modal" id="ChangePasswordModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-body">
                <h5 className="fw-bold mb-3">Change Password</h5>
                <hr />
                <form
                  onSubmit={(e) => {
                    changePassword(e);
                  }}
                >
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      onChange={(e) => getPass(e)}
                      className={`form-control rounded-0 ${passErr.oldPass && showError ? "border-danger" : "border-dark"}`}
                      name="oldPass"
                      placeholder="Old Password"
                    />
                    <label htmlFor="floatingInputOldPass" className="text-dark">
                      Old Password
                    </label>
                    {passErr.oldPass && showError ? (
                      <p className="text-danger">{passErr.oldPass}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      onChange={(e) => getPass(e)}
                      className={`form-control rounded-0 ${passErr.newPass && showError ? "border-danger" : "border-dark"}`}
                      name="newPass"
                      placeholder="New Password"
                    />
                    <label htmlFor="floatingInputNewPass" className="text-dark">
                      New Password
                    </label>
                    {passErr.newPass && showError ? (
                      <p className="text-danger">{passErr.newPass}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      onChange={(e) => getPass(e)}
                      className={`form-control rounded-0 ${passErr.cnfNewPass && showError ? "border-danger" : "border-dark"}`}
                      name="cnfNewPass"
                      placeholder="Confirm Password"
                    />

                    <label htmlFor="floatingInputConPass" className="text-dark">
                      Confirm Password
                    </label>
                    {passErr.cnfNewPass && showError ? (
                      <p className="text-danger">{passErr.cnfNewPass}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-grid gap-3 w-100">
                    <button
                      type="submit"
                      className="btn btn-dark py-3 btn-ecomm"
                    >
                      {" "}
                      Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark py-3 btn-ecomm"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      {" "}
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Change Password Modal */}
      </div>
      {/*end page content*/}
    </>
  );
}
