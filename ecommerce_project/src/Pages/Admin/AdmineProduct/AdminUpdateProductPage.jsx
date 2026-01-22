import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import imageValidator from "../../../Validators/imageValidator";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreator";
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreator";
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreator";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../../Redux/ActionCreators/ProductActionCreator";
import SizeColor from "../../../Validators/SizeColor";
export default function AdminUpdateProductPage() {
  let mainCategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let subCategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let brandStateData = useSelector((state) => state.BrandStateData);
  let productStateData = useSelector((state) => state.ProductStateData);

  let dispatch = useDispatch();
  let { id } = useParams();

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    stockQuantity: 1,
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    pic: [],
    discription: "",
    stock: "",
    active: true,
  });

  let [errorMsg, setErrorMsg] = useState({
    name: "",
    basePrice: "",
    discount: "",
    stockQuantity: "",
    pic: "",
    color: "",
    size: "",
  });
  let [show, setShow] = useState(false);
  let nevigate = useNavigate();

  // Functions
  const getInputData = (e) => {
    let name = e.target.name;
    let value;
    switch (name) {
      case "name":
        value = e.target.value;
        break;
      case "pic":
        value =
          e.target.files &&
          data.pic.concat([...e.target.files].map((pic) => pic.name));
        break;
      // value= e.target.files&&Array.from(e.target.files).map(pics=>pics.name)
      case "active":
        e.target.value === "1" ? (value = true) : (value = false);
        break;
      default:
        value = e.target.value;
    }
    setErrorMsg((curSt) => {
      return {
        ...curSt,
        [name]:
          name == "Pic"
            ? imageValidator(e)
            : name == "name" ||
                name == "basePrice" ||
                name == "discount" ||
                name == "stockQuantity" ||
                name == "Pic"
              ? FormValidator(e)
              : "",
      };
    });
    setData((curSt) => {
      return { ...curSt, [name]: value };
    });
  };

  //For Size
  let setSize = (e) => {
    let value = e.target.value;
    let CheckOption = e.target.checked;
    let sizeLength = data.size.length;
    let name = e.target.name;

    sizeLength = CheckOption ? sizeLength + 1 : sizeLength - 1;
    setErrorMsg((pre) => {
      return {
        ...pre,
        [name]: SizeColor(e, sizeLength),
      };
    });

    setData((pre) => {
      let update = CheckOption
        ? [...pre.size, value]
        : pre.size.filter((size) => size !== value);
      return { ...pre, size: update };
    });
  };

  //For Plan Text remove HTML tag from discription
  const getPlainText = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  //For Color
  let getInputColor = (e) => {
    let value = e.target.value;
    let CheckOpt = e.target.checked;
    let CheckOptLength = data.color.length;
    let name = e.target.name;

    CheckOptLength = CheckOpt ? CheckOptLength + 1 : CheckOptLength - 1;

    setErrorMsg((pre) => {
      return {
        ...pre,
        [name]: SizeColor(e, CheckOptLength),
      };
    });
    setData((pre) => {
      let update = CheckOpt
        ? [...pre.color, value]
        : pre.color.filter((clr) => clr !== value);
      return { ...pre, color: update };
    });
  };

  //For Post Data
  const postData = (e) => {
    e.preventDefault();

    let stkQ = Number(data.stockQuantity);
    let baseP = Number(data.basePrice);
    let dis = parseFloat(data.discount);
    let fPrice = parseInt(baseP - (baseP * dis) / 100);
    let stock = Number(data.stock);

    let error = Object.values(errorMsg).find((err) => err !== "");
    console.log("error is", error);
    if (error) {
      error && setShow(true);
    } else {
      dispatch(
        updateProduct({
          ...data,
          basePrice: baseP,
          discount: dis,
          stockQuantity: stkQ,
          finalPrice: fPrice,
          maincategory: data.maincategory
            ? data.maincategory
            : mainCategoryStateData[0].name,
          subcategory: data.subcategory
            ? data.subcategory
            : subCategoryStateData[0].name,
          brand: data.brand ? data.brand : brandStateData[0].name,
          stock: data.stock ? data.stock : "In Stock",
        }),
      );
      nevigate("/admin/product");
    }
  };
  //For Image Delete

  const deleteImgPic = (itemAr, Picindx) => {
    let product = itemAr;
    if (data.pic.length === 1) {
      alert("Atleast One Photo is Mandatory");
    } else {
      const updatPic = product.filter((_, indx) => indx !== Picindx);
      setData((pre) => {
        return { ...pre, pic: updatPic };
      });
    }
  };

  //For Get API
  const getProductAPI = () => {
    dispatch(getProduct()); //API
  };
  useEffect(() => {
    getProductAPI();
  }, []);

  useEffect(() => {
    if (productStateData.length) {
      let PreviousValue = productStateData.find((item) => item.id === id);

      if (PreviousValue) {
        setData((pre) => {
          return { ...pre, ...PreviousValue };
        });
      } else {
        nevigate("/admin/product");
      }
    }
  }, [productStateData]);

  function mainCategoryStarter() {
    dispatch(getMaincategory());
  }
  function subCategoryStarter() {
    dispatch(getSubcategory());
  }
  function brandStarter() {
    dispatch(getBrand());
  }
  useEffect(() => {
    mainCategoryStarter();
  }, [mainCategoryStarter.length]);

  useEffect(() => {
    subCategoryStarter();
  }, [subCategoryStarter.length]);
  useEffect(() => {
    brandStarter();
  }, [brandStarter.length]);

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
                Update Product
                <Link to="/admin/product">
                  {" "}
                  <i className="bi bi-arrow-left float-end text-light"></i>
                </Link>
              </h1>
              <form onSubmit={(e) => postData(e)}>
                <div className="mb-3">
                  <label className="text-dark"> Name</label>
                  <input
                    type="text"
                    placeholder="Product"
                    name="name"
                    value={data.name}
                    onChange={(e) => {
                      getInputData(e);
                    }}
                    className={`form-control ${show && errorMsg.name ? "border-danger" : "border-dark"}`}
                  />
                  {show && errorMsg.name ? (
                    <p className="text-danger">{errorMsg.name} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label>Maincategory*</label>
                    <select
                      name="maincategory"
                      className="form-select"
                      value={data.maincategory}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                    >
                      {mainCategoryStateData.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>SubCategory*</label>
                    <select
                      name="subcategory"
                      value={data.subcategory}
                      className="form-select"
                      onChange={(e) => {
                        getInputData(e);
                      }}
                    >
                      {subCategoryStateData.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>Brand*</label>
                    <select
                      name="brand"
                      className="form-select"
                      value={data.brand}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                    >
                      {brandStateData.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>Stock*</label>
                    <select
                      name="stock"
                      className="form-select"
                      value={data.stock}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                    >
                      <option value={"In Stock"}>In Stock</option>
                      <option value={"Out of Stock"}>Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label>Base Price*</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={data.basePrice}
                      name="basePrice"
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className={`form-control ${show && errorMsg.basePrice ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.basePrice ? (
                      <p className="text-danger">{errorMsg.basePrice} </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-4">
                    <label>Discount*</label>
                    <input
                      type="text"
                      placeholder="Discount"
                      name="discount"
                      value={data.discount}
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className={`form-control ${show && errorMsg.discount ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.discount ? (
                      <p className="text-danger">{errorMsg.discount} </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-4">
                    <label>Stock Quantity*</label>
                    <input
                      type="number"
                      placeholder="Stock Quantity"
                      value={data.stockQuantity}
                      name="stockQuantity"
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className={`form-control ${show && errorMsg.stockQuantity ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.stockQuantity ? (
                      <p className="text-danger">{errorMsg.stockQuantity} </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <label className="mb-2 d-block mt-3">Choose Size*</label>
                <div className="form-control border-dark mt-1">
                  <div
                    className={`my-1 form-control ${show && errorMsg.size ? "border-danger" : "border-dark"}`}
                  >
                    <div className="row">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => (
                        <div
                          className="col-6 col-sm-4 col-md-2 mb-2"
                          key={index}
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              value={size}
                              checked={data.size.includes(size)}
                              type="checkbox"
                              name="size"
                              onChange={(e) => setSize(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${size}`}
                            >
                              {" "}
                              {size}{" "}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {errorMsg.size && show ? (
                  <p className="text-danger">{errorMsg.size}</p>
                ) : (
                  ""
                )}

                <label className="mb-2 d-block  mt-3">Choose Color*</label>

                <div className="form-control border-dark mt-1">
                  <div
                    className={`my-1 form-control ${show && errorMsg.color ? "border-danger" : "border-dark"}`}
                  >
                    <div className="row">
                      {[
                        "Red",
                        "Blue",
                        "Green",
                        "Yellow",
                        "Black",
                        "White",
                        "Purple",
                        "Orange",
                        "Pink",
                        "Brown",
                        "Grey",
                        "Teal",
                      ].map((color, index) => (
                        <div
                          className="col-6 col-sm-4 col-md-2 mb-2"
                          key={index}
                        >
                          <div className="form-check">
                            <input
                              type="checkbox"
                              name="color"
                              value={color}
                              className={"form-check-input"}
                              onChange={(e) => getInputColor(e)}
                              checked={data.color.includes(color)}
                            />

                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${color}`}
                            >
                              {" "}
                              {color}{" "}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {show && errorMsg.color ? (
                  <p className="text-danger">{errorMsg.color} </p>
                ) : (
                  ""
                )}

                <div className="row mb-3 mt-3">
                  <label className="mb-1">Discription*</label>
                  <div className="col-md-12">
                    <textarea
                      placeholder="Discription"
                      value={getPlainText(data.discription)}
                      rows={3}
                      name="discription"
                      onChange={(e) => {
                        getInputData(e);
                      }}
                      className={`form-control ${show && errorMsg.discription ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.discription ? (
                      <p className="text-danger">{errorMsg.discription} </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-dark"> Pic</label>
                    <input
                      type="file"
                      name="pic"
                      onChange={(e) => getInputData(e)}
                      multiple
                      className={`form-control ${show && errorMsg.pic ? "border-danger" : "border-dark"}`}
                    />
                    {show && errorMsg.pic ? (
                      <p className="text-danger">{errorMsg.pic} </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6 mb-3 ">
                    <label className="text-dark">
                      PIC(Click On Pic To Delete*)
                    </label>
                    <div style={{ width: "300px" }}>
                      {data.pic &&
                        data.pic.map((pic, indx) => (
                          <React.Fragment key={indx}>
                            <Link
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                              to={`${import.meta.env.VITE_SITE_SERVER}/product/${pic}`}
                            >
                              <img
                                src={`${import.meta.env.VITE_SITE_SERVER}/product/${pic}`}
                                alt="image"
                                width={60}
                                height={60}
                              />
                            </Link>
                            <i
                              className="bi bi-trash text-danger fs-3"
                              onClick={() => {
                                deleteImgPic(data.pic, indx);
                              }}
                            ></i>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3 ">
                    <label className="text-dark">Active*</label>
                    <select
                      name="active"
                      className="form-select"
                      value={data.active ? "1" : "0"}
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
                    Update Product
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
