import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  createFeature,
  getFeature,
} from "../../../Redux/ActionCreators/FeatureActionCreator";

export default function AdminFeatureCreatePage() {
  let [data, setData] = useState({
    name: "",
    shortDescription: "",
    icon: "",
    active: true,
  });
  let featureStateData = useSelector((state) => state.FeatureStateData);
  let dispatch = useDispatch();

  let [errorMsg, setErrorMsg] = useState({
    name: "Name Field is Mandatory",
    icon: "icon is Mandatory",
    shortDescription: "shortDescription is Mandatory",
  });

  let [show, setShow] = useState(false);
  let nevigate = useNavigate();

  // Functions
  const getInputData = (e) => {
    let { name, value } = e.target;
    setErrorMsg((curSt) => {
      return { ...curSt, [name]: FormValidator(e) };
    });
    setData((curSt) => {
      return {
        ...curSt,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  };
  const postData = (e) => {
    e.preventDefault();
    let error = Object.values(errorMsg).find((ar) => ar !== "");
    if (error) {
      error && setShow(true);
    } else {
      let checkNameDuplicacy = featureStateData.find(
        (item) => item.name.toLowerCase() === data.name.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        setErrorMsg((obj) => {
          return { ...obj, name: "Feature Name is Already Exist " };
        });
        setShow(true);
        return;
      }
      dispatch(createFeature({ ...data }));
      nevigate("/admin/feature");
    }
  };

  //for check name duplicacy in category

  const getAPIdata = () => {
    getFeature();
  };
  useEffect(() => {
    getAPIdata();
  }, []);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h1 className="px-2 text-center bg-dark text-light">
                Create Feature
                <Link to="/admin/feature">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark"> Name</label>
                  <input
                    type="text"
                    placeholder="Feature"
                    name="name"
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className={`form-control ${show && errorMsg.name ? "border-danger" : "border-dark"}`}
                  />
                  {show && errorMsg.name ? (
                    <p className="text-danger">{errorMsg.name} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-dark">Short Description</label>
                  <textarea
                    rows={4}
                    placeholder="Enter short description"
                    name="shortDescription"
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className={`form-control ${show && errorMsg.shortDescription ? "border-danger" : "border-dark"}`}
                  />
                  {show && errorMsg.shortDescription ? (
                    <p className="text-danger">{errorMsg.shortDescription} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-dark"> Icon</label>
                    <input
                      type="text"
                      placeholder="Icon Tag"
                      name="icon"
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className={`form-control ${show && errorMsg.icon ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.icon ? (
                      <p className="text-danger">{errorMsg.name} </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6 mb-3 ">
                    <label className="text-dark">Active*</label>
                    <select
                      name="active"
                      className="form-select"
                      onChange={(e) => getInputData(e)}
                    >
                      <option value="" disabled hidden>
                        Choose Active Status
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-dark text-light w-100"
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
