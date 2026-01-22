import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";
import ProductSlider from "../Components/ProductSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { createCart } from "../Redux/ActionCreators/CartActionCreator";
import {
  createWishlist,
  getWishlist,
} from "../Redux/ActionCreators/WishListAction";

export default function ProductDetailsPage() {
  {
    /* For Swiper */
  }
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  {
    /* For Color BootStrap*/
  }
  const bsColorMap = {
    Red: "text-danger",
    Blue: "text-primary",
    Green: "text-success",
    Yellow: "text-warning",
    Black: "text-dark",
    White: "text-white",
    Purple: "text-purple",
    Teal: "text-info",
    Pink: "text-pink",
    Brown: "text-brown",
    Grey: "text-secondary",
    Orange: "text-orange",
  };
  let navigate = useNavigate();
  let [review, setReview] = useState([]);
  console.log("Review", review);

  let [reviewState, setReviewState] = useState({
    stats: [],
    total: 0,
    average: 0,
  });

  let TestimonialData = useSelector((x) => x.TestimonialStateData);
  let productStateData = useSelector((state) => state.ProductStateData);
  let [wishListData, setWishListData] = useState();
  let WishlistSelector = useSelector((x) => x.WishListStateData);
  let dispatch = useDispatch();
  let { id } = useParams();
  let [data, setData] = useState({});

  let [relatedProduct, setRelatedProduct] = useState();
  let [itemSize, setSize] = useState([]);
  let [selectClr, setClr] = useState([]);
  let [qty, setqty] = useState(1);

  let quantity = (value) => {
    setqty((pre) => {
      if (value === "-" && qty > 1) return qty - 1;
      else if (value === "+" && data?.stockQuantity > qty) return pre + 1;
      return pre;
    });
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [id]);

  useEffect(() => {
    if (productStateData) {
      let item = productStateData.find((itm) => itm.id === id);
      setData(item);
      if (item) {
        setRelatedProduct(item.maincategory);
      }
    }
  }, [productStateData]);

  const cartTimeoutRef = useRef(null); //for timeout
  let sendDataToCart = async () => {
    const selectedSize = itemSize.length > 0 ? itemSize : [data?.size?.[0]];
    const selectedColor = selectClr.length > 0 ? selectClr : [data?.color?.[0]];
    const cartPayload = {
      selectedSizes: selectedSize,
      selectedColors: selectedColor,
      quantity: qty,
      productId: data?.id,
      pic: data?.pic[0] ?? [],
      finalPrice: data.finalPrice,
      discount: data.discount,
      basePrice: data.basePrice,
      brand: data.brand,
      name: data.name,
      stockQuantity: data.stockQuantity,
      discription: data.discription,
      stock: data.stock,
    };
    let res = await dispatch(createCart({ ...cartPayload }));
    if (res) {
      setClr([]);
      setSize([]);
      toast.success("Item Sucessfully Added in Cart");
      cartTimeoutRef.current = setTimeout(() => {
        navigate("/shop");
      }, 2000);
    }
  };

  const wishlistTimeoutRef = useRef(null); //for timeout
  let addToWishList = async () => {
    const selectedSize = itemSize.length > 0 ? itemSize : [data?.size?.[0]];
    const selectedColor = selectClr.length > 0 ? selectClr : [data?.color?.[0]];
    const cartPayload = {
      selectedSizes: selectedSize,
      selectedColors: selectedColor,
      quantity: qty,
      productId: data?.id,
      pic: data?.pic[0] ?? [],
      finalPrice: data.finalPrice,
      discount: data.discount,
      basePrice: data.basePrice,
      brand: data.brand,
      name: data.name,
      stockQuantity: data.stockQuantity,
    };

    let chkItemInWishList = wishListData.find((x) => x.productId === id);
    if (chkItemInWishList) {
      toast.info("Item Already Added");
      setClr([]);
      setSize([]);
    } else {
      let res = await dispatch(createWishlist({ ...cartPayload }));
      if (res) {
        toast.success("Item Sucessfully Added In WishList");
        setClr([]);
        setSize([]);
        wishlistTimeoutRef.current = setTimeout(() => {
          navigate("/shop");
        }, 2000);
      } else {
        toast.error("Some issue occur");
      }
    }
  };

  //for WihsList and Testimonial
  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getTestimonial());
  }, []);

  useEffect(() => {
    if (WishlistSelector) {
      setWishListData(WishlistSelector);
    }
  }, [WishlistSelector]);

  useEffect(() => {
    return () => {
      if (cartTimeoutRef.current) {
        clearTimeout(cartTimeoutRef.current);
        clearTimeout(wishlistTimeoutRef.current);
      }
      if (wishlistTimeoutRef.current) {
        clearTimeout(wishlistTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (TestimonialData) {
      let data = TestimonialData.filter((x) => x.product === id);
      if (data) {
        setReview(data);
        let sum = 0;
        let stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        data.forEach((r) => {
          stats[r.star] = stats[r.star] ? stats[r.star] + 1 : 1;
          sum += r.star;
        });
        setReviewState({
          total: data.length,
          stats: stats,
          average: (sum / data.length).toFixed(1),
        });
      }
    }
  }, [TestimonialData]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      {/*start page content*/}
      <div className="page-content">
        {/*start breadcrumb*/}
        <div className="py-4 border-bottom">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript:;">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Page Details
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/*end breadcrumb*/}
        {/*start product details*/}
        <section className="py-4">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-xl-7">
                <div className="product-images">
                  <div className="product-zoom-images mb-1">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#4f64e8ff",
                        "--swiper-pagination-color": "#4848e747",
                      }}
                      loop={false}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3">
                        {data?.pic?.map((product, indx) => {
                          return (
                            <SwiperSlide>
                              <div className="swiper-zoom-container">
                                <div className="col" key={product.id || indx}>
                                  <div className="img-thumb-container overflow-hidden position-relative">
                                    <img
                                      src={
                                        product
                                          ? `${import.meta.env.VITE_SITE_SERVER}/product/${product}`
                                          : "assets/images/product-images/02.jpg"
                                      }
                                      className="img-fluid"
                                      alt=""
                                      style={{
                                        height: 600,
                                        width: "70%",
                                        marginLeft: "15%",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </div>
                    </Swiper>
                  </div>
                  <div className="product-zoom-images">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      loop={false}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3">
                        {data?.pic?.map((product, indx) => {
                          return (
                            <SwiperSlide>
                              <div className="swiper-zoom-container">
                                <div className="col" key={product.id || indx}>
                                  <div className="img-thumb-container overflow-hidden position-relative">
                                    <img
                                      src={
                                        product
                                          ? `${import.meta.env.VITE_SITE_SERVER}/product/${product}`
                                          : "assets/images/product-images/02.jpg"
                                      }
                                      className="img-fluid"
                                      alt=""
                                      style={{ height: 200, width: "100%" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-5">
                <div className="product-info">
                  <h4 className="product-title fw-bold mb-1 text-center">
                    Check {data && data.name}
                  </h4>
                  <p className="mb-0 text-center">
                    {data?.maincategory}/{data?.subcategory}/{data?.brand}
                  </p>
                  {review.length !== 0 && (
                    <div className="product-rating">
                      <div className="hstack gap-2 border p-1 mt-3 width-content">
                        <div>
                          <span className="rating-number">
                            {reviewState.total}
                          </span>
                          <i className="bi bi-star-fill ms-1 text-warning" />
                        </div>
                        <div className="vr" />
                        <div>{reviewState.average} Ratings</div>
                      </div>
                    </div>
                  )}
                  <hr />
                  <div className="product-price d-flex align-items-center gap-3">
                    <div className="h4 fw-bold">{data?.finalPrice ?? 0}</div>
                    <div className="h5 fw-light text-muted text-decoration-line-through">
                      {data?.basePrice ?? 0}
                    </div>
                    <div className="h4 fw-bold text-danger">
                      {data?.discount ?? 0}% Off
                    </div>
                  </div>
                  <p className="fw-bold mb-0 mt-1 text-success">
                    inclusive of all taxes
                  </p>
                  <div className="more-colors mt-4">
                    <h6 className="fw-bolder mb-4 fs-4 ">Available Colors</h6>
                    <div className="d-flex flex-wrap align-items-center justify-align-content-between gap-4">
                      {data?.color?.map((clr, indx) => {
                        const clrboot = bsColorMap[clr];
                        return (
                          <div className="form-check" key={indx}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectClr.includes(clr)}
                              id={`chekColor4${indx}`}
                              onChange={(e) =>
                                e.target.checked
                                  ? setClr((pre) => [...pre, clr])
                                  : setClr((pre) =>
                                      pre.filter((cl) => cl !== clr),
                                    )
                              }
                              style={{
                                transform: "scale(1.5)",
                                marginRight: "5px",
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`chekColor4${indx}`}
                            >
                              <i
                                className={`bi bi-circle-fill me-1 ${clrboot}`}
                              />
                              <span className="text-dark fw-bolder">{clr}</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="size-chart mt-4">
                    <h6 className="fw-bolder mb-4 fs-4">Available Size</h6>
                    <div className="d-flex align-items-center gap-5 flex-wrap">
                      {data?.size?.map((size, indx) => {
                        return (
                          <div className="form-check" key={indx}>
                            <input
                              className="form-check-input"
                              name="exampleRadios"
                              checked={itemSize.includes(size)}
                              type="checkbox"
                              id={`chekDisc5${indx}`}
                              style={{
                                transform: "scale(1.5)",
                                marginRight: "5px",
                              }}
                              onChange={(e) =>
                                e.target.checked
                                  ? setSize((pre) => [...pre, size])
                                  : setSize((pre) =>
                                      pre.filter((s) => s !== size),
                                    )
                              }
                            />
                            <label
                              className="form-check-label text-dark"
                              htmlFor={`chekDisc5${indx}`}
                            >
                              <span className="text-dark fw-bolder">
                                {size}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <label className="text-dark fw-bolder fs-4 mt-3">
                    Select Quantity{" "}
                    <span className="fs-6">
                      (Stock&ensp;{data?.stockQuantity})
                    </span>
                  </label>
                  <div className="d-flex mt-1">
                    <div className="btn btn-group">
                      <button
                        className="btn btn-dark"
                        onClick={() => quantity("-")}
                        style={{ width: "50px", borderRadius: "8px" }}
                      >
                        <i className="bi bi-dash text-light"></i>
                      </button>
                      <h3 className="mx-3">{qty}</h3>
                      <button
                        className="btn btn-dark"
                        onClick={() => quantity("+")}
                        style={{ width: "50px", borderRadius: "8px" }}
                      >
                        <i className="bi bi-plus text-light"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-buttons mt-3">
                    <div className="buttons d-flex flex-column flex-lg-row gap-3 mt-4 w-100 h-50">
                      <button
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                        onClick={() => sendDataToCart()}
                      >
                        <i className="bi bi-basket2 me-2" />
                        Add To Cart
                      </button>
                      <button
                        onClick={() => addToWishList()}
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                      >
                        <i className="bi bi-suit-heart me-2" />
                        Wishlist
                      </button>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="product-info">
                    <h6 className="fw-bolder fs-3 mb-3 ">Product Details</h6>
                    {data && (
                      <p
                        className="mb-1 text-dark fw-bolder"
                        dangerouslySetInnerHTML={{ __html: data.discription }}
                      ></p>
                    )}
                  </div>
                  <hr className="my-3" />
                  {review.length !== 0 && (
                    <>
                      <div className="customer-ratings">
                        <h6 className="fw-bold mb-3">Customer Ratings</h6>
                        <div className="d-flex align-items-center gap-4 gap-lg-5 flex-wrap flex-lg-nowrap">
                          <div className="">
                            <h1 className="mb-2 fw-bold">
                              {reviewState.average}
                              <span className="fs-5 ms-2 text-warning">
                                <i className="bi bi-star-fill" />
                              </span>
                            </h1>
                            <p className="mb-0">
                              {review.length} Verified Buyers
                            </p>
                          </div>
                          <div className="vr d-none d-lg-block" />
                          <div className="w-100">
                            {[5, 4, 3, 2, 1].map((star) => {
                              const count = reviewState.stats[star] || 0;
                              const percent =
                                reviewState.total > 0
                                  ? (count / reviewState.total) * 100
                                  : 0;
                              let colorClass = "";
                              if (star === 5) colorClass = "bg-success";
                              else if (star === 4) colorClass = "bg-primary";
                              else if (star === 3) colorClass = "bg-warning";
                              else if (star === 2) colorClass = "bg-info";
                              else colorClass = "bg-danger";

                              return (
                                <div
                                  key={star}
                                  className="rating-wrrap hstack gap-2 align-items-center"
                                >
                                  <p className="mb-0">{star}</p>
                                  <div>
                                    <i className="bi bi-star" />
                                  </div>
                                  <div
                                    className="progress flex-grow-1 mb-0 rounded-0"
                                    style={{ height: 4 }}
                                  >
                                    <div
                                      className={`progress-bar ${colorClass}`}
                                      role="progressbar"
                                      style={{ width: `${percent}%` }}
                                    />
                                  </div>
                                  <p className="mb-0">{count}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <hr className="my-3" />
                      <div className="customer-reviews">
                        <h6 className="fw-bold mb-3">
                          Customer Reviews {review.length}
                        </h6>
                        <div className="reviews-wrapper">
                          {review.map((r, indx) => {
                            return (
                              <div key={r.id || indx}>
                                <div className="d-flex flex-column flex-lg-row gap-3">
                                  <div className="">
                                    <span className="badge bg-green rounded-0">
                                      {reviewState.average}
                                      <i className="bi bi-star-fill ms-1" />
                                    </span>
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-2 text-dark">
                                      {r?.review ?? ""}
                                    </p>
                                    <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                                      <div className="hstack flex-grow-1 gap-3">
                                        <p className="mb-0 text-primary fw-bold">
                                          {r?.name ?? ""}
                                        </p>
                                        <div className="vr" />
                                        <div className="date-posted text-dark">
                                          {r?.date
                                            ? new Date(
                                                r.date,
                                              ).toLocaleDateString()
                                            : ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      <div>
        {data && productStateData && (
          <ProductSlider
            title="Latest"
            data={productStateData.filter(
              (p) => p.maincategory === data.maincategory,
            )}
          />
        )}
      </div>
    </>
  );
}
