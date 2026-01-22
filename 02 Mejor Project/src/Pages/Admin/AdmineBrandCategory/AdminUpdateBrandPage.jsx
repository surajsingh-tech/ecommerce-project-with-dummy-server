import React, { use, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import imageValidator from "../../../Validators/imageValidator";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrand,
  updateBrand,
} from "../../../Redux/ActionCreators/BrandActionCreator";

export default function AdminUpdateCategoryPage() {
  let dispatch = useDispatch();
  let brandStateData = useSelector((state) => state.BrandStateData);
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });

  let { id } = useParams();
  let navigate = useNavigate();

  let [errorMsg, setErrorMsg] = useState({
    name: "",
    pic: "",
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
  const postData = (e) => {
    e.preventDefault();
    let error = Object.values(errorMsg).find((ar) => ar !== "");
    if (error) {
      error && setShow(true);
    } else {
      let checkNameDuplicacy = brandStateData.find(
        (item) =>
          id != item.id && item.name.toLowerCase() === data.name.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        setErrorMsg((obj) => {
          return { ...obj, name: "Brand Name is Already Exist " };
        });
        setShow(true);
        return;
      } else {
        dispatch(updateBrand({ ...data }));
        if (brandStateData) {
          nevigate("/admin/brand");
        } else {
          alert("Some Problen is happend");
        }
      }
    }
  };
  const getAPIdata = () => {
    dispatch(getBrand());
    if (brandStateData.length) {
      let checkId = brandStateData.find((item) => item.id === id);
      if (checkId) {
        setData({
          ...data,
          ...checkId,
        }); /*{id: '7ad5', name: 'Female', pic: 'woman-beautiful-red-dress.jpg', active: true}*/
      } else {
        navigate("/admin/brand");
      }
    }
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
                Update Brand
                <Link to="/admin/brand">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark"> Name</label>
                  <input
                    type="text"
                    placeholder="Brand"
                    name="name"
                    value={data.name}
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
                      value={data.active ? "1" : "0"}
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
                    Update Brand
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
