import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator";
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator";
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../Components/ProductCart";
import { useParams } from "react-router-dom";

export default function ShopPage() {
  let mainCategoryStateData = useSelector(
    (state) => state.MaincategoryStateData,
  );
  let subCategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let productStateData = useSelector((state) => state.ProductStateData);
  let brandStateData = useSelector((state) => state.BrandStateData);
  let { filterType, filterValue } = useParams();

  {
    /*For Color*/
  }
  const clrAr = [
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
  ]; // Copy From ProductCreate Category
  const bsColorMap = {
    Red: "text-danger",
    Blue: "text-primary",
    Green: "text-success",
    Yellow: "text-warning",
    Black: "text-dark",
    White: "text-white",
    Purple: "text-purple",
    Orange: "text-orange",
    Pink: "text-pink",
    Brown: "text-brown",
    Grey: "text-secondary",
    Teal: "text-info",
  };

  let ProductSize = ["S", "M", "L", "XS", "XL", "XXL"];
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getMaincategory());
    dispatch(getSubcategory());
    dispatch(getBrand());
  }, []);

  let [selectMainCategory, setMainCategory] = useState([]);
  let [selectBrand, setBrand] = useState([]);
  let [subCategory, setSubcategory] = useState([]);
  let [selectClr, setClr] = useState([]);
  let [search, setSearch] = useState("");
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(0);
  let [itemSize, setSize] = useState([]);
  let [sortBy, setSortBy] = useState("");

  {
    /*For Price*/
  }
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const priceSetting = (e) => {
    let { name, value } = e.target;
    if (name === "min") setMin(value);
    else if (name === "max") setMax(value);
  };

  const setPrice = (e) => {
    e.preventDefault();
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);

    if (minVal > maxVal) {
      alert("Enter price Renage Properly");
    } else if (minVal && maxVal) {
      setMinPrice(minVal);
      setMaxPrice(maxVal);
    }
  };

  {
    /*For Product Filters*/
  }
  let mainCategorySelectItem = useMemo(() => {
    let filtered = productStateData?.filter(
      (item) =>
        item.active &&
        (selectMainCategory.length === 0 ||
          selectMainCategory.includes(item.maincategory)) &&
        (selectBrand.length === 0 || selectBrand.includes(item.brand)) &&
        (subCategory.length === 0 || subCategory.includes(item.subcategory)) &&
        (selectClr.length === 0 ||
          selectClr.some((clr) => item.color.includes(clr))) &&
        (itemSize.length === 0 ||
          itemSize.some((s) => item.size.includes(s))) &&
        ((minPrice === 0 && maxPrice === 0) ||
          (item.finalPrice >= minPrice && item.finalPrice <= maxPrice)) &&
        (search == "" ||
          item.subcategory?.toLowerCase().includes(search.toLowerCase()) ||
          item.maincategory?.toLowerCase().includes(search.toLowerCase()) ||
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          String(item.basePrice) === search ||
          String(item.finalPrice) === search ||
          String(item.discount) === search ||
          item.brand?.toLowerCase().includes(search.toLowerCase()) ||
          item.size?.some((s) =>
            s.toLowerCase().includes(search.toLowerCase()),
          ) ||
          item.color?.some((c) =>
            c.toLowerCase().includes(search.toLowerCase()),
          ) ||
          item.discription?.toLowerCase().includes(search.toLowerCase())),
    );
    if (sortBy === "") {
      return filtered;
    } else if (sortBy === "1") {
      return filtered.slice(-3).reverse();
    } else if (sortBy === "2") {
      return [...filtered].sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "3") {
      return [...filtered].sort((a, b) => b.finalPrice - a.finalPrice);
    } else if (sortBy === "4") {
      return [...filtered].sort((a, b) => a.finalPrice - b.finalPrice);
    }
    return filtered;
  }, [
    productStateData,
    selectMainCategory,
    selectBrand,
    subCategory,
    selectClr,
    itemSize,
    minPrice,
    maxPrice,
    search,
    sortBy,
  ]);

  {
    /*For Link Routes*/
  }
  useEffect(() => {
    let decode = decodeURIComponent(filterValue);
    if (filterType === "brand") {
      setBrand([decode]);
    } else if (filterType === "Maincategory") {
      setMainCategory([decode]);
    } else if (filterType === "Subcategory") {
      setSubcategory([decode]);
    }
  }, [filterType, filterValue]);

  return (
    <>
      <div className="page-content">
        {/*start product grid*/}
        <BreadCrumb title={"shop"} />
        <section className="py-4">
          <h5 className="mb-0 fw-bold d-none">Product Grid</h5>
          <div className="container-fluid">
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-funnel me-1" /> Filters
              </span>
            </div>
            <div className="row">
              <div className="col-12 col-xl-2 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Filters
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <div className="filter-sidebar">
                        <div className="card rounded-0">
                          <div className="card-header d-none d-xl-block bg-transparent">
                            <h5 className="mb-0 fw-bold">Filters</h5>
                          </div>
                          <div className="card-body">
                            <h6 className="p-1 fw-bold bg-light">
                              MainCategory
                            </h6>
                            <div className="categories">
                              <div className="categories-wrapper height-0 mb-4 p-1">
                                {mainCategoryStateData &&
                                  mainCategoryStateData
                                    .filter((x) => x.active)
                                    .map((item, indx) => {
                                      return (
                                        <div
                                          className="form-check"
                                          key={item.id || indx}
                                        >
                                          <input
                                            className="form-check-input"
                                            id={`chekCate1${indx}`}
                                            checked={selectMainCategory.includes(
                                              item.name,
                                            )}
                                            type="checkbox"
                                            onChange={(e) =>
                                              e.target.checked
                                                ? setMainCategory((pre) => [
                                                    ...pre,
                                                    item.name,
                                                  ])
                                                : setMainCategory((prev) =>
                                                    prev.filter(
                                                      (x) => x !== item.name,
                                                    ),
                                                  )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`chekCate1${indx}`}
                                          >
                                            <span className="text-dark">
                                              {item.name && item.name}
                                            </span>
                                            <span className="product-number text-dark">
                                              (
                                              {(productStateData &&
                                                productStateData.filter(
                                                  (x) =>
                                                    x.active &&
                                                    x.maincategory.toLowerCase() ===
                                                      item.name.toLowerCase(),
                                                ).length) ||
                                                0}
                                              )
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    })}
                              </div>
                              <hr />
                            </div>
                            <h6 className="p-1 fw-bold bg-light">
                              SubCategory
                            </h6>
                            <div className="categories">
                              <div className="categories-wrapper height-0 mb-4 p-1">
                                {subCategoryStateData &&
                                  subCategoryStateData
                                    .filter((x) => x.active)
                                    .map((item, indx) => {
                                      return (
                                        <div
                                          className="form-check"
                                          key={item.id || indx}
                                        >
                                          <input
                                            className="form-check-input"
                                            id={`chekCate2${indx}`}
                                            checked={subCategory.includes(
                                              item.name,
                                            )}
                                            type="checkbox"
                                            onChange={(e) =>
                                              e.target.checked
                                                ? setSubcategory((pre) => [
                                                    ...pre,
                                                    item.name,
                                                  ])
                                                : setSubcategory((pre) =>
                                                    pre.filter(
                                                      (x) => x !== item.name,
                                                    ),
                                                  )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`chekCate2${indx}`}
                                          >
                                            <span className="text-dark">
                                              {item.name && item.name}
                                            </span>
                                            <span className="product-number text-dark">
                                              (
                                              {(productStateData &&
                                                productStateData.filter(
                                                  (x) =>
                                                    x.active &&
                                                    x.subcategory.toLowerCase() ===
                                                      item.name.toLowerCase(),
                                                ).length) ||
                                                0}
                                              )
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                            <hr />
                            <div className="brands">
                              <h6 className="p-1 fw-bold bg-light">Brands</h6>
                              <div className="brands-wrapper height-0 mb-4 p-1">
                                {brandStateData &&
                                  brandStateData
                                    .filter((x) => x.active)
                                    .map((br, indx) => {
                                      return (
                                        <div
                                          className="form-check"
                                          key={br.id || indx}
                                        >
                                          <input
                                            className="form-check-input"
                                            id={`chekBrand3${indx}`}
                                            checked={selectBrand.includes(
                                              br.name,
                                            )}
                                            type="checkbox"
                                            onChange={(e) =>
                                              e.target.checked
                                                ? setBrand((pre) => [
                                                    ...pre,
                                                    br.name,
                                                  ])
                                                : setBrand((pre) =>
                                                    pre.filter(
                                                      (item) =>
                                                        item !== br.name,
                                                    ),
                                                  )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`chekBrand3${indx}`}
                                          >
                                            <span>{br.name}</span>
                                            <span className="product-number text-dark">
                                              &nbsp; (
                                              {(productStateData &&
                                                productStateData.filter(
                                                  (x) =>
                                                    x.active &&
                                                    x.brand.toLowerCase() ===
                                                      br.name.toLowerCase(),
                                                ).length) ||
                                                0}
                                              )
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                            <hr />
                            <div className="Price">
                              <h6 className="p-1 fw-bold bg-light">Price</h6>
                              <form onSubmit={(e) => setPrice(e)}>
                                <div className="Price-wrapper p-1">
                                  <div>
                                    <input
                                      name="min"
                                      type="number"
                                      className="form-control rounded-0 ShopPrice w-75 fs-6"
                                      placeholder="Min Price"
                                      onChange={(e) => {
                                        priceSetting(e);
                                      }}
                                    />
                                    <span className="bg-section-1 border-0 fs-6 mt-4 text-dark">
                                      To
                                    </span>
                                    <div style={{ display: "flex" }}>
                                      <input
                                        name="max"
                                        type="number"
                                        className="form-control rounded-0 ShopPrice w-75 fs-6"
                                        style={{ marginRight: "5px" }}
                                        placeholder="Max Price"
                                        onChange={(e) => {
                                          priceSetting(e);
                                        }}
                                      />
                                      <button
                                        type="submit"
                                        className="btn btn-outline-dark rounded-0 "
                                      >
                                        <i className="bi bi-chevron-right" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <hr />
                            <div className="colors">
                              <h6 className="p-1 fw-bold bg-light">Colors</h6>
                              <div className="color-wrapper height-1 p-1">
                                {clrAr.map((clr, indx) => {
                                  const clrboot = bsColorMap[clr];
                                  return (
                                    <div className="form-check" key={indx}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`chekColor4${indx}`}
                                        onClick={(e) =>
                                          e.target.checked
                                            ? setClr((pre) => [...pre, clr])
                                            : setClr((pre) =>
                                                pre.filter((cl) => cl !== clr),
                                              )
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`chekColor4${indx}`}
                                      >
                                        <i
                                          className={`bi bi-circle-fill me-1 ${clrboot}`}
                                        />
                                        <span>{clr}</span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <hr />
                            <div className="discount">
                              <h6 className="p-1 fw-bold bg-light">
                                Size Range
                              </h6>
                              <div className="discount-wrapper p-1">
                                {ProductSize &&
                                  ProductSize.map((size, indx) => {
                                    return (
                                      <div className="form-check" key={indx}>
                                        <input
                                          className="form-check-input"
                                          name="exampleRadios"
                                          type="checkbox"
                                          id={`chekDisc5${indx}`}
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
                                          {size}
                                        </label>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-10">
                <div className="shop-right-sidebar">
                  <div className="card rounded-0">
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center justify-content-between bg-light p-2">
                        <form style={{ width: "70%" }}>
                          <input
                            type="text"
                            placeholder="&ensp;Search Product By Name,Color,Size,Category etc.."
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                              height: "40px",
                              borderRadius: "8px",
                              width: "80%",
                            }}
                          />
                          <button
                            className="bg-dark text-light fw-bold"
                            style={{ height: "40px", borderRadius: "8px" }}
                          >
                            Submit
                          </button>
                        </form>
                        <div className="product-count ">
                          {(mainCategorySelectItem &&
                            mainCategorySelectItem.length) ||
                            0}
                          &ensp;Items Found
                        </div>
                        <form>
                          <div className="input-group">
                            <span className="input-group-text bg-transparent rounded-0 border-0">
                              Sort By
                            </span>
                            <select
                              className="form-select rounded-0"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                            >
                              <option value="">ALL</option>
                              <option value="1">Whats'New</option>
                              <option value="2">Better Discount</option>
                              <option value="3">Price : Hight to Low</option>
                              <option value="4">Price : Low to Hight</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="product-grid mt-4">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                      {mainCategorySelectItem &&
                        mainCategorySelectItem.map((product, indx) => {
                          return (
                            <div className="col" key={product.id || indx}>
                              <ProductCart item={product} />
                            </div>
                          );
                        })}
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
    </>
  );
}
