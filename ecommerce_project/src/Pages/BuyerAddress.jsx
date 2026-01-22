import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import BuyersSideBar from "../Components/BuyersSideBar";

export default function BuyerAddress() {
  let navigate = useNavigate();
  let [option, setOption] = useState();
  let [userData, setUserData] = useState();

  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
  });

  let getInputDAta = (e) => {
    let { name, value } = e.target;

    setUserData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  let [updateID, setUpdateId] = useState();
  let postDAta = async (e) => {
    e.preventDefault();
    let url =
      option === "Create"
        ? `${import.meta.env.VITE_SITE_SERVER}/address`
        : `${import.meta.env.VITE_SITE_SERVER}/address/${updateID}`;
    let response = await fetch(url, {
      method: option === "Create" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        user: localStorage.getItem("userid"),
      }),
    });
    response = await response.json();
    if (response) {
      document.getElementById("closeModalBtn").click();
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: "",
        pinCode: "",
        city: "",
        state: "",
      });
      getAPIData();
    }
  };

  let dltAddress = async (id) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SITE_SERVER}/address/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      response = await response.json();
      if (response) {
        getAPIData();
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  let getAPIData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SITE_SERVER}/address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      response = await response.json();
      if (response) {
        let userADDress = response.filter(
          (x) => x.user === localStorage.getItem("userid"),
        );
        setData(userADDress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Buyer Address"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="w-100 text-center">
                <h4 className="mb-0 h4 fw-bold">Account - Addresses</h4>
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
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-0">Saved Address</h5>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-ecomm"
                          data-bs-toggle="modal"
                          data-bs-target="#NewAddress"
                          onClick={() => setOption("Create")}
                        >
                          <i className="bi bi-plus-lg me-2" />
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="fw-bold mb-3 py-2 px-3 bg-light">
                      Default Address
                    </h6>
                    {data.length > 0 &&
                      data?.map((x, indx) => {
                        return (
                          <React.Fragment key={x.id || indx}>
                            <div
                              className="card rounded-0 mb-3 "
                              key={x.id || indx}
                            >
                              <div className="card-body">
                                <div className="d-flex flex-column flex-xl-row gap-3">
                                  <div className="address-info form-check flex-grow-1">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefaultAddress"
                                      id="flexRadioDefaultAddress1"
                                      defaultChecked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefaultAddress1"
                                    >
                                      <span className="fw-bold mb-0 h5">
                                        {x?.name}
                                      </span>
                                      <br />
                                      <span>{x.address}</span>
                                      <br />
                                      {x.city}&emsp;{x?.state},{x?.pinCode}
                                      <br />
                                      Mobile:{x?.phone}
                                      <span className="text-dark fw-bold">
                                        +91-{x?.phone}
                                      </span>
                                    </label>
                                  </div>
                                  <div className="d-none d-xl-block vr" />
                                  <div className="d-grid gap-2 align-self-start align-self-xl-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        dltAddress(x.id);
                                      }}
                                      className="btn btn-outline-dark px-5 btn-ecomm"
                                    >
                                      Remove
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        (setOption("Update"),
                                          setUserData(x),
                                          setUpdateId(x.id));
                                      }}
                                      className="btn btn-outline-dark px-5 btn-ecomm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#NewAddress"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}

                    <div className="card rounded-0">
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-ecomm"
                          data-bs-toggle="modal"
                          data-bs-target="#NewAddress"
                          onClick={() => {
                            setOption("Create");
                            setUserData({
                              name: "",
                              email: "",
                              phone: "",
                              address: "",
                              pinCode: "",
                              city: "",
                              state: "",
                            });
                          }}
                        >
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        <button
          type="button"
          id="closeModalBtn"
          className="d-none"
          data-bs-dismiss="modal"
        ></button>
        //for closing modal on post and update
        <div
          className="modal"
          id="NewAddress"
          tabIndex={-1}
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <form onSubmit={(e) => postDAta(e)}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Add New Address</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="">
                    <h6 className="fw-bold mb-3">Contact Details</h6>
                    <div className="mb-3">
                      <label htmlFor="floatingName" className="mb-1 text-dark">
                        Name
                      </label>
                      <input
                        onChange={(e) => getInputDAta(e)}
                        value={userData?.name}
                        type="text"
                        name="name"
                        className="form-control rounded-0"
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="row">
                      <div className="mb-3 col-6">
                        <label
                          htmlFor="floatingName"
                          className="mb-1 text-dark "
                        >
                          {" "}
                          Email Address
                        </label>
                        <input
                          onChange={(e) => getInputDAta(e)}
                          type="text"
                          name="email"
                          value={userData?.email}
                          className="form-control rounded-0"
                          placeholder="Enter Email Address "
                        />
                      </div>
                      <div className="mb-3 col-6">
                        <label
                          htmlFor="floatingName"
                          className="mb-1 text-dark"
                        >
                          {" "}
                          Phone Number
                        </label>
                        <input
                          onChange={(e) => getInputDAta(e)}
                          type="text"
                          name="phone"
                          className="form-control rounded-0"
                          value={userData?.phone}
                          placeholder="Enter Phone  Number "
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Address</h6>
                    <div className="mb-3">
                      <input
                        onChange={(e) => getInputDAta(e)}
                        type="text"
                        name="address"
                        className="form-control rounded-0"
                        value={userData?.address}
                        placeholder="Enter Address"
                      />
                    </div>

                    <div className="row">
                      <div className=" col-4">
                        <label
                          htmlFor="floatingName"
                          className="text-center text-dark mb-1"
                        >
                          {" "}
                          Pin Code
                        </label>
                        <input
                          onChange={(e) => getInputDAta(e)}
                          type="number"
                          name="pinCode"
                          value={userData?.pinCode}
                          className="form-control rounded-0"
                          placeholder="Pin Code "
                        />
                      </div>
                      <div className=" col-4">
                        <label
                          htmlFor="floatingName"
                          className="text-center mb-1 text-dark"
                        >
                          {" "}
                          City Name
                        </label>
                        <input
                          onChange={(e) => getInputDAta(e)}
                          type="text"
                          name="city"
                          className="form-control rounded-0"
                          value={userData?.city}
                          placeholder=" City Name"
                        />
                      </div>
                      <div className=" col-4">
                        <label
                          htmlFor="floatingName"
                          className="text-center text-dark mb-1"
                        >
                          {" "}
                          State Name
                        </label>
                        <input
                          onChange={(e) => getInputDAta(e)}
                          type="text"
                          name="state"
                          value={userData?.state}
                          className="form-control rounded-0"
                          placeholder=" State Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="d-grid w-100">
                    <button
                      type="submit"
                      className="btn btn-dark py-3 px-5 btn-ecomm"
                    >
                      {option}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*end page content*/}
    </>
  );
}
