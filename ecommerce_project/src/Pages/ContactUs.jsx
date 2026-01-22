import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator";
import FromValidator from "../Validators/FormValidator";
import { createContact } from "../Redux/ActionCreators/ContactUsActionCreator";
export default function ContactUs() {
  let [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  let [message, setMessage] = useState("");
  let [data, setData] = useState({});
  let disPatch = useDispatch();
  let settingStateData = useSelector((x) => x.SettingStateData);

  useEffect(() => {
    disPatch(getSetting());
  }, []);

  useEffect(() => {
    if (settingStateData.length) {
      setData({
        map1: settingStateData[0]?.map1 ?? "",
        map2: settingStateData[0]?.map2 ?? "",
        address: settingStateData[0]?.address ?? "",
        email: settingStateData[0]?.email ?? "",
        phone: settingStateData[0]?.phone ?? "",
        whatsapp: settingStateData[0]?.whatsapp ?? "",
      });
    } else {
      setData({
        map1: import.meta.env.VITE_SITE_MAP1,
        map2: import.meta.env.VITE_SITE_MAP2,
        address: import.meta.env.VITE_SITE_ADDRESS,
        email: import.meta.env.VITE_SITE_E_mail,
        phone: import.meta.env.VITE_SITE_PHONE,
        whatsapp: import.meta.env.VITE_SITE_WHATSAPP,
      });
    }
  }, [settingStateData]);

  let getInputData = (e) => {
    let { name, value } = e.target;
    setInputData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      await disPatch(
        createContact({
          ...inputData,
          active: true,
          date: new Date(),
        }),
      );
      setMessage(
        "Thanks to Share your Query with us. Our Team will Contact You Soon",
      );
      setInputData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <BreadCrumb title={"Contact"} />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="separator mb-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Find Us Map</h3>
              <div className="line" />
            </div>
            <div className="border p-3">
              <iframe
                className="w-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805184.6320105711!2d144.49269039866502!3d-37.971237001538135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1654250375825!5m2!1sen!2sin"
                height={450}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="separator my-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Why Choose Us</h3>
              <div className="line" />
            </div>
            <div className="row g-4">
              <div className="col-xl-8">
                <div className="p-4 border">
                  <form onSubmit={(e) => postData(e)}>
                    <div className="form-body">
                      <h4 className="mb-0 fw-bold">Drop Us a Line</h4>
                      <div className="my-3 border-bottom" />
                      <div className="mb-3 text-dark">
                        <label className="form-label">Enter Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={inputData.name}
                          onChange={(e) => getInputData(e)}
                          className="form-control rounded-0"
                        />
                      </div>
                      <div className="mb-3 text-dark">
                        <label className="form-label">Enter Email</label>
                        <input
                          type="text"
                          name="email"
                          value={inputData.email}
                          onChange={(e) => getInputData(e)}
                          className="form-control rounded-0"
                        />
                      </div>
                      <div className="mb-3 text-dark">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={inputData.phone}
                          onChange={(e) => getInputData(e)}
                          className="form-control rounded-0"
                        />
                      </div>
                      <div className="mb-3 text-dark">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={inputData.subject}
                          onChange={(e) => getInputData(e)}
                          className="form-control rounded-0"
                        />
                      </div>
                      <div className="mb-3 text-dark">
                        <label className="form-label">Message</label>
                        <textarea
                          value={inputData.message}
                          className="form-control rounded-0"
                          onChange={(e) => getInputData(e)}
                          name="message"
                          rows={4}
                          cols={4}
                        />
                      </div>
                      {message ? (
                        <p className="text-primary">{message}</p>
                      ) : null}
                      <button type="submit">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="p-3 border">
                  <div className="address mb-3">
                    <h5 className="mb-0 fw-bold">Address</h5>
                    <p className="mb-0 font-12 text-primary">
                      {data?.address ?? ""}
                    </p>
                  </div>
                  <hr />
                  <div className="phone mb-3">
                    <h5 className="mb-0 fw-bold">Phone</h5>
                    <Link to={`tel:${data.phone}`}>{data?.phone ?? ""}</Link>
                  </div>
                  <hr />
                  <div className="email mb-3">
                    <h5 className="mb-0 fw-bold">Whatsapp</h5>
                    <p className="mb-0 font-13 text-primary">
                      {data?.whatsapp ?? ""}
                    </p>
                  </div>
                  <hr />
                  <div className="email mb-3">
                    <h5 className="mb-0 fw-bold">Email</h5>
                    <p className="mb-0 font-13 text-primary">
                      {data?.email ?? ""}
                    </p>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  );
}
