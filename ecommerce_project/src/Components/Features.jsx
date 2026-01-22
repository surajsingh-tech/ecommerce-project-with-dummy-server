import React, { useEffect } from "react";

// import required modules
import { getFeature } from "../Redux/ActionCreators/FeatureActionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function Features() {
  let dispatch = useDispatch();
  let features = useSelector((state) => state.FeatureStateData);

  useEffect(() => {
    dispatch(getFeature());
  }, []);

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mx-5 my-1 justify-content-center">
        {features &&
          features
            .filter((f) => f.active)
            .map((feature, indx) => (
              <div className="col" key={feature.id || indx}>
                <div
                  className="card depth border-0 rounded-0 border-bottom border-2 w-100"
                  style={{
                    width: "300px",
                    minHeight: "180px",
                    padding: "0.75rem",
                  }}
                >
                  <div className="card-body text-center p-2">
                    <div
                      className="text-primary"
                      style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: feature.icon }}
                      ></span>
                    </div>
                    <h6
                      className="fw-bold fs-5 mb-2"
                      style={{ fontSize: "1rem" }}
                    >
                      {feature.name}
                    </h6>
                    <p
                      className="mb-0 text-justify fw-normal text-dark"
                      style={{ minHeight: "80px", fontSize: "0.9rem" }}
                    >
                      {feature.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}
