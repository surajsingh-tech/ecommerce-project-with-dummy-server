import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createSetting,
  getSetting,
  updateSetting,
} from "../../../Redux/ActionCreators/SettingActionCreator";

export default function AdminSettingCreatePage() {
  let [data, setData] = useState({
    map1: "",
    map2: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    youtube: "",
    linkdin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    sitename: "",
  });
  let settingStateData = useSelector((state) => state.SettingStateData);

  let dispatch = useDispatch();
  let nevigate = useNavigate();

  // Functions
  const getInputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData((curSt) => {
      return { ...curSt, [name]: value };
    });
  };
  const postData = async (e) => {
    e.preventDefault();

    if (settingStateData.length) {
      dispatch(updateSetting({ ...data }));
    } else {
      dispatch(createSetting({ ...data }));
      nevigate("/admin/setting");
    }
    alert("Record Update Sucessfully");
  };

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setData((pre) => {
      return { ...pre, ...settingStateData[0] };
    });
  }, [settingStateData]);

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
                Create Setting
                <Link to="/admin/setting">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark">Google Map URL</label>
                  <input
                    type="text"
                    placeholder="Map url"
                    name="map1"
                    value={data.map1}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Google Map URL</label>
                  <input
                    type="text"
                    placeholder="Map url"
                    name="map2"
                    value={data.map2}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="row mb-3">
                  <div className="mb-3 col-md-4">
                    <label className="text-dark">Address</label>
                    <textarea
                      placeholder="Map url"
                      name="address"
                      value={data.address}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className="form-control border-dark"
                    />
                  </div>

                  <div className="mb-3 col-md-4">
                    <label className="text-dark">Phone</label>
                    <input
                      type="number"
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={data.phone}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className="form-control border-dark"
                    />
                  </div>
                  <div className="mb-3  col-md-4">
                    <label className="text-dark">Email</label>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      value={data.email}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className="form-control border-dark"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-dark">Whatsapp</label>
                  <input
                    type="number"
                    placeholder="Enter Whatsapp Contact Number"
                    name="whatsapp"
                    value={data.whatsapp}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">youtube</label>
                  <input
                    type="text"
                    placeholder="youtube Link"
                    name="youtube"
                    value={data.youtube}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Linkdin</label>
                  <input
                    type="text"
                    placeholder="Linkdin Link"
                    name="linkdin"
                    value={data.linkdin}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Facebook</label>
                  <input
                    type="text"
                    placeholder="Facebook link"
                    name="facebook"
                    value={data.facebook}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Instagram</label>
                  <input
                    type="text"
                    placeholder="Instagram link"
                    name="instagram"
                    value={data.instagram}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Twitter</label>
                  <input
                    type="text"
                    placeholder="Twitter link"
                    name="twitter"
                    value={data.twitter}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-dark">Site Name</label>
                  <input
                    type="text"
                    placeholder="Website url"
                    name="sitename"
                    value={data.sitename}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className="form-control border-dark"
                  />
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
