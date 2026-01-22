import React, { useEffect, useState } from "react";
import {
  createNewsletter,
  getNewsletter,
} from "../Redux/ActionCreators/NewsletterActionCreator";
import { useSelector, useDispatch } from "react-redux";
export default function NewsLetter() {
  let dispatch = useDispatch();
  let [role, setRole] = useState();
  let [email, setEmail] = useState();
  let [newsLetter, setNewsLetter] = useState([]);
  let [message, setMessage] = useState("");
  let newsLetterStateData = useSelector((x) => x.NewsletterStateData);

  let postData = (e) => {
    e.preventDefault();
    if (email === "") {
      role === "Admin";
      setMessage("Please Enter Valid Email Address");
    } else if (newsLetter.find((x) => x.email === email)) {
      setMessage("Your Email Address is already Registered with us");
    } else {
      dispatch(createNewsletter({ email: email, active: true }));
      setMessage("Thank You: Your Email Address is Subscribed with us");
    }
    setEmail("");
  };

  useEffect(() => {
    setNewsLetter(newsLetterStateData);
  }, [newsLetterStateData]);

  useEffect(() => {
    dispatch(getNewsletter());
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <>
      {role === "Buyer" && (
        <section className="product-thumb-slider subscribe-banner p-5">
          <div className="row">
            <div className="col-12 col-lg-6 mx-auto">
              <div className="text-center">
                <h3 className="mb-0 fw-bold text-white">
                  Get Latest Update by <br /> Subscribe Our Newsletter
                </h3>
                {message ? (
                  <p className="text-center text-light fw-bold">{message}</p>
                ) : null}
                <form onSubmit={(e) => postData(e)}>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="form-control form-control-lg bubscribe-control rounded-0 px-5 py-3"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-3 d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-ecomm bubscribe-button px-5 py-3"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
