import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "../Redux/ActionCreators/CartActionCreator";
import { Link } from "react-router-dom";

export default function OrderSummary() {
  let selector = useSelector((x) => x.CartStateData);
  let dispatch = useDispatch();
  let [data, setData] = useState();
  let [cardQty, setcardQty] = useState(0);
  let [finalCartPrise, setfinalCartPrise] = useState(0);

  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (data) {
      data.map((x) => {
        return (
          (price += Number(x.finalPrice) * Number(x.quantity)),
          (qty += Number(x.quantity))
        );
      });
    }
    setfinalCartPrise(price);
    setcardQty(qty);
  }, [data]);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    setData(selector);
  }, [selector]);

  return (
    <>
      <div className="col-12 col-xl-4">
        <div className="card rounded-0 mb-3">
          <div className="card-body">
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="hstack align-items-center  fw-bold justify-content-between">
              <p className="mb-0 text-dark">Total Items QTY</p>
              <p className="mb-0 text-dark">{cardQty}</p>
            </div>
            <hr />

            <div className="hstack align-items-center fw-bold justify-content-between">
              <p className="mb-0 text-dark">Delivery</p>
              <p className="mb-0 text-dark">&#8377;29.00</p>
            </div>
            <hr />
            <div className="hstack align-items-center justify-content-between fw-bold text-content">
              <p className="mb-0">Total Amount</p>
              <p className="mb-0">&#8377;{finalCartPrise}</p>
            </div>
            <hr />
            <div className="hstack align-items-center fw-bold justify-content-between">
              <p className="mb-0 text-dark">Final Amount</p>
              <p className="mb-0 text-dark">
                &#8377;{Math.round(finalCartPrise + 29)}
              </p>
            </div>
            <div className="d-grid mt-4">
              <Link to="/CheckOut" className="btn btn-dark btn-ecomm py-3 px-5">
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
