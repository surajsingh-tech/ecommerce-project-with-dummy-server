import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
export default function AdminHomePage() {
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
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
        let item = response?.find(
          (x) =>
            (x.name?.toLowerCase() ===
              localStorage.getItem("name")?.toLowerCase() ||
              x.email?.toLowerCase() ===
                localStorage.getItem("email")?.toLowerCase()) &&
            x.id === localStorage.getItem("userid"),
        );
        if (item) {
          setUserData({
            name: item.name,
            email: item.email,
            phone: item.phone,
            role: item.role,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  return (
    <>
      <div className="page-content mt-4">
        <div className="container-fluid my-2">
          <div className="row mt-4">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h1 className="px-2 text-center bg-dark text-light">
                Admin Home Page
              </h1>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="/assets/images/avatars/user.jpg"
                      width="100%"
                      height="300"
                      alt="user"
                      style={{ border: "3px solid black" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>User Name</th>
                          <td>{userData?.name ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{userData?.email ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{userData?.phone ?? ""}</td>
                        </tr>
                        <tr>
                          <th>Role</th>
                          <td>{userData?.role ?? ""}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="btn btn-dark text-light w-100">
                      <Link to="/admin/updateProfile">Update Profile</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
