import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import FormValidator from "../../../Validators/FormValidator";
export default function AdminUserCreatePage() {
  let navigate = useNavigate();
  let [userData, setUserData] = useState([]);

  let getData = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      if (response) {
        setUserData(response);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    role: "Admin",
    active: true,
    password: "",
  });

  let [errMsg, setErrMsg] = useState({
    name: "Name is required",
    username: "Username is required",
    phone: "Phone number is required",
    email: "Email is required",
    password: "Password is Mandatory",
  });

  let [show, setShow] = useState(false);

  const getInputData = (e) => {
    const { name, value } = e.target;

    setErrMsg((pre) => ({
      ...pre,
      [name]: name === "role" || name === "active" ? "" : FormValidator(e),
    }));

    setData((prev) => ({
      ...prev,
      [name]: value === "false" ? false : value === "true" ? true : value,
    }));
  };

  let postData = async (e) => {
    e.preventDefault();
    try {
      let error = Object.values(errMsg).find((ar) => ar !== "");
      if (error) {
        errMsg && setShow(true);
      } else {
        let checkNameDuplicacy = userData.find(
          (item) => item.username.toLowerCase() === data.username.toLowerCase(),
        );
        if (checkNameDuplicacy) {
          setErrMsg((pre) => ({
            ...pre,
            username: "Username Already Exist",
          }));
          setShow(true);
        } else {
          setShow(false);
          let response = await fetch(
            `${import.meta.env.VITE_SITE_SERVER}/user`,
            {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ ...data }),
            },
          );
          const result = await response.json();
          setData({
            name: "",
            username: "",
            phone: "",
            email: "",
            role: "",
            active: "",
            password: "",
          });
          navigate("/admin/user");
          return result;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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
              <h5 className="bg-dark text-white p-2 text-center">
                Create User Profile
              </h5>
              <div className="row">
                <div className="table-responsive">
                  {data ? (
                    <form onSubmit={(e) => postData(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Name:
                            </label>
                            <input
                              className={`form-control ${show && errMsg.name ? "border-danger" : "border-dark"}`}
                              type="text"
                              name="name"
                              onChange={(e) => getInputData(e)}
                            />
                            {show && errMsg.name ? (
                              <p className="text-danger">{errMsg.name} </p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Username:
                            </label>
                            <input
                              className={`form-control ${show && errMsg.username ? "border-danger" : "border-dark"}`}
                              type="text"
                              name="username"
                              onChange={(e) => getInputData(e)}
                            />
                            {show && errMsg.username ? (
                              <p className="text-danger">{errMsg.username} </p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Password:
                            </label>
                            <input
                              className={`form-control ${show && errMsg.password ? "border-danger" : "border-dark"}`}
                              type="text"
                              name="password"
                              onChange={(e) => getInputData(e)}
                            />
                            {show && errMsg.password ? (
                              <p className="text-danger">{errMsg.password} </p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Phone:
                            </label>
                            <input
                              className={`form-control ${show && errMsg.phone ? "border-danger" : "border-dark"}`}
                              type="text"
                              name="phone"
                              onChange={(e) => getInputData(e)}
                            />
                            {show && errMsg.phone ? (
                              <p className="text-danger">{errMsg.phone} </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Email:
                            </label>
                            <input
                              className={`form-control ${show && errMsg.email ? "border-danger" : "border-dark"}`}
                              type="email"
                              name="email"
                              onChange={(e) => getInputData(e)}
                            />
                            {show && errMsg.email ? (
                              <p className="text-danger">{errMsg.email} </p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Role:
                            </label>
                            <select
                              name="role"
                              value={data.role}
                              className="form-select"
                              onChange={(e) => getInputData(e)}
                            >
                              <option value="" disabled>
                                Select Role
                              </option>
                              <option value="Admin">Admin</option>
                              <option value="Super Admin">Super Admin</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label className="form-label text-dark">
                              Active:
                            </label>
                            <select
                              name="active"
                              value={data.active}
                              className="form-select"
                              onChange={(e) => getInputData(e)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-center">There is no data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
