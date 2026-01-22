import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";

// to us dataTables.net
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

export default function AdminUserPage() {
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

  let deleteUser = async (id, role) => {
    if (role === "Super Admin") {
      if ($.fn.DataTable.isDataTable("#brandTable")) {
        $("#brandTable").DataTable().destroy();
      }
      if (confirm("Are You Sure ? Want To Delete User")) {
        try {
          let response = await fetch(
            `${import.meta.env.VITE_SITE_SERVER}/user/${id}`,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            },
          );
          let result = await response.json();
          getData();
          return result;
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("⚠️ Warning: Only Super Admin can delete this record!");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //for dataTables
  useEffect(() => {
    let timer;
    if (userData) {
      timer = setTimeout(() => {
        if ($.fn.DataTable.isDataTable("#brandTable")) {
          $("#brandTable").DataTable().destroy(); // old instance remove
        }
        // new instance initialize
        $("#brandTable").DataTable();
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userData]);
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
                User's Details
                <Link to="/admin/user/create">
                  {" "}
                  <i className="bi bi-plus float-end text-light"></i>
                </Link>
              </h1>
              <div className="row">
                <div className="table-responsive">
                  {userData ? (
                    <table className="table table-bordered" id="brandTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Active</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item?.name ?? ""}</td>
                              <td>{item?.username ?? ""}</td>
                              <td>{item?.email ?? ""}</td>
                              <td>{item?.phone ?? ""}</td>
                              <td>{item?.role ?? ""}</td>
                              <td>{item?.active ? "Yes" : "NO"}</td>
                              {/* <td style={{cursor:'pointer'}} onClick={()=>updateUserData(item.id)}>{item.active?'Yes':'No'}</td> */}
                              <td>
                                {item.role === "Buyer" ? null : (
                                  <Link
                                    to={`/admin/user/update/${item.id}`}
                                    className="btn btn-primary"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>
                                )}
                              </td>
                              <td>
                                {item.role === "Buyer" ? null : (
                                  <button
                                    onClick={() =>
                                      deleteUser(item.id, item.role)
                                    }
                                    className="btn btn-danger"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
