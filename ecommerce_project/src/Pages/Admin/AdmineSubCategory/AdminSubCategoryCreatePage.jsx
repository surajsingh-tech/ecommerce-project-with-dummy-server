import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import imageValidator from "../../../Validators/imageValidator";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubcategory,
  getSubcategory,
} from "../../../Redux/ActionCreators/SubcategoryActionCreator";

export default function AdminSubCategoryCreatePage() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });
  let subcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let dispatch = useDispatch();

  let [errorMsg, setErrorMsg] = useState({
    name: "Name Field is Mandatory",
    pic: "Pic is Mandatory",
  });

  let [show, setShow] = useState(false);
  let nevigate = useNavigate();

  // Functions
  const getInputData = (e) => {
    let name = e.target.name;
    let value;
    switch (name) {
      case "name":
        value = e.target.value;
        break;
      case "pic":
        value = e.target.files[0].name;
        break;
      case "active":
        e.target.value === "1" ? (value = true) : (value = false);
        break;
      default:
        value = "";
    }
    setErrorMsg((curSt) => {
      return {
        ...curSt,
        [name]:
          name == "pic"
            ? imageValidator(e)
            : name == "name"
              ? FormValidator(e)
              : "",
      };
    });
    setData((curSt) => {
      return { ...curSt, [name]: value };
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    let error = Object.values(errorMsg).find((ar) => ar !== "");
    if (error) {
      error && setShow(true);
    } else {
      let checkNameDuplicacy = subcategoryStateData.find(
        (item) => item.name.toLowerCase() === data.name.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        setErrorMsg((obj) => {
          return { ...obj, name: "Subcategory Name is Already Exist " };
        });
        setShow(true);
        return;
      }
      dispatch(createSubcategory({ ...data }));
      nevigate("/admin/subcategory");
    }
  };

  //for check name duplicacy in category

  const getAPIdata = () => {
    getSubcategory();
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
                Create Subcategory
                <Link to="/admin/subcategory">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark"> Name</label>
                  <input
                    type="text"
                    placeholder="Subcategory"
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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-dark"> Pic</label>
                    <input
                      type="file"
                      name="pic"
                      onChange={(e) => getInputData(e)}
                      className={`form-control ${show && errorMsg.pic ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.pic ? (
                      <p className="text-danger">{errorMsg.pic} </p>
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
