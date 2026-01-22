import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";

export default function AdminUserUpdatePage() {
  let navigate = useNavigate();
  let { id } = useParams();
  let [userData, setUserData] = useState();
  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    role: "",
    active: "",
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value === "false" ? false : value === "true" ? true : value,
    }));
  };

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
        let x = response.find((x) => x.id === id);
        if (x) {
          setData(x);
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  let updateUserData = async (e) => {
    e.preventDefault();
    if (!confirm("Are You Sure to Update User Data :")) return;
    {
      let checkNameDuplicacy = userData.find(
        (item) =>
          item.id !== id &&
          item.username.toLowerCase() === data.username.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        alert("Username Already Exist Please Change username");
      } else {
        try {
          let response = await fetch(
            `${import.meta.env.VITE_SITE_SERVER}/user/${id}`,
            {
              method: "PUT",
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
          });
          navigate("/admin/user");
          return result;
        } catch (error) {
          console.log(error);
        }
      }
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
                Edit Details
              </h5>
              <div className="row">
                <div className="table-responsive">
                  {data ? (
                    <form onSubmit={(e) => updateUserData(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              value={data?.name ?? ""}
                              onChange={(e) => getInputData(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input
                              className="form-control"
                              type="text"
                              name="username"
                              value={data?.username ?? ""}
                              onChange={(e) => getInputData(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Phone:</label>
                            <input
                              className="form-control"
                              type="text"
                              name="phone"
                              value={data?.phone ?? ""}
                              onChange={(e) => getInputData(e)}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              value={data?.email ?? ""}
                              onChange={(e) => getInputData(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Role:</label>
                            <select
                              name="role"
                              className="form-select"
                              value={data?.role ?? ""}
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
                            <label className="form-label">Active:</label>
                            <select
                              name="active"
                              className="form-select"
                              value={data?.active ?? ""}
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
