import React, { use, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import imageValidator from "../../../Validators/imageValidator";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  getFAQ,
  updateFAQ,
} from "../../../Redux/ActionCreators/MaincategoryFAQ";

export default function AdminUpdateCategoryPage() {
  let dispatch = useDispatch();
  let faqStateData = useSelector((state) => state.FAQStateData);
  let [data, setData] = useState({
    question: "",
    answer: "",
    active: true,
  });

  let { id } = useParams();
  let navigate = useNavigate();

  let [errorMsg, setErrorMsg] = useState({
    question: "",
    answer: "",
  });

  let [show, setShow] = useState(false);

  // Functions
  const getInputData = (e) => {
    let { name, value } = e.target;
    setErrorMsg((curSt) => {
      return { ...curSt, [name]: name !== "active" && FormValidator(e) };
    });
    setData((curSt) => {
      return {
        ...curSt,
        [name]: name == "active" ? (value == "1" ? true : false) : value,
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
        (item) =>
          id != item.id &&
          item.question.toLowerCase() === data.question.toLowerCase(),
      );
      if (checkNameDuplicacy) {
        setErrorMsg((obj) => {
          return { ...obj, name: "Faq Name is Already Exist" };
        });
        setShow(true);
        return;
      } else {
        dispatch(updateFAQ({ ...data }));
        if (faqStateData) {
          navigate("/admin/fAQ");
        } else {
          alert("Some Problen is happend");
        }
      }
    }
  };
  const getAPIdata = () => {
    dispatch(getFAQ());
    if (faqStateData.length) {
      let checkId = faqStateData.find((item) => item.id === id);
      if (checkId) {
        setData({
          ...data,
          ...checkId,
        }); /*{id: '7ad5', name: 'Female', pic: 'woman-beautiful-red-dress.jpg', active: true}*/
      } else {
        navigate("/admin/faq");
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
                Update FAQ
                <Link to="/admin/faq">
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
                    value={data.question}
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
                    placeholder="Enter short description"
                    value={data.answer}
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
                      value={data.active ? "1" : "0"}
                      onChange={(e) => getInputData(e)}
                    >
                      <option value="" hidden>
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
                    Update FAQ
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
