import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  createFAQ,
  getFAQ,
} from "../../../Redux/ActionCreators/MaincategoryFAQ";

export default function AdminFaqCreatePage() {
  let [data, setData] = useState({
    question: "",
    answer: "",
    active: true,
  });
  let faqStateData = useSelector((state) => state.FAQStateData);
  let dispatch = useDispatch();

  let [errorMsg, setErrorMsg] = useState({
    question: "question Field is Mandatory",
    answer: "answer is Mandatory",
  });

  let [show, setShow] = useState(false);
  let nevigate = useNavigate();

  // Functions
  const getInputData = (e) => {
    let { name, value } = e.target;
    setErrorMsg((curSt) => {
      return { ...curSt, [name]: name !== "active" && FormValidator(e) };
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
      let checkNameDuplicacy = faqStateData.find(
        (item) => item.question.toLowerCase() === data.question.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        setErrorMsg((obj) => {
          return { ...obj, question: "Faq Question is Already Exist " };
        });
        setShow(true);
        return;
      }
      dispatch(createFAQ({ ...data }));
      nevigate("/admin/fAQ");
    }
  };

  //for check name duplicacy in category

  const getAPIdata = () => {
    getFAQ();
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
                Create FAQ
                <Link to="/admin/FAQ">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark">Question</label>
                  <input
                    type="text"
                    placeholder="Faq"
                    name="question"
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className={`form-control ${show && errorMsg.question ? "border-danger" : "border-dark"}`}
                  />
                  {show && errorMsg.question ? (
                    <p className="text-danger">{errorMsg.question} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-dark">Answer</label>
                  <textarea
                    rows={4}
                    placeholder="Enter Answer Here"
                    name="answer"
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className={`form-control ${show && errorMsg.answer ? "border-danger" : "border-dark"}`}
                  />
                  {show && errorMsg.answer ? (
                    <p className="text-danger">{errorMsg.answer} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
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
