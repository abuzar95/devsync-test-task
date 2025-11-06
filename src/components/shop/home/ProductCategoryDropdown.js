import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HomeContext } from "./index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllProduct, productByPrice, productBySearch } from "../../admin/products/FetchApi";
import "./style.css";

const apiURL = process.env.REACT_APP_API_URL;

const CategoryList = () => {
  const history = useHistory();
  const { data } = useContext(HomeContext);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${data.categoryListDropdown ? "" : "hidden"} my-4`}>
      <hr />
      <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <Fragment key={index}>
                <div
                  onClick={(e) =>
                    history.push(`/products/category/${item._id}`)
                  }
                  className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer"
                >
                  <img
                    src={`${apiURL}/uploads/categories/${item.cImage}`}
                    alt="pic"
                  />
                  <div className="font-medium">{item.cName}</div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="text-xl text-center my-4">No Category</div>
        )}
      </div>
    </div>
  );
};

const FilterSearch = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (!maxPrice) {
      alert("Max price is required");
      return;
    }

    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await productBySearch({
        title: title || "",
        description: category || "", // Use category input as description parameter for category search
        maxPrice: maxPrice,
      });
      
      if (responseData && responseData.success && responseData.items) {
        // Use items directly as they already have the necessary fields
        const products = responseData.items.map(item => ({
          _id: item._id || item.id,
          pName: item.pName || item.title,
          pPrice: item.pPrice || item.price,
          pImages: item.pImages || [],
          pRatingsReviews: item.pRatingsReviews || [],
        }));
        dispatch({ type: "setProducts", payload: products });
        dispatch({ type: "loading", payload: false });
      } else {
        dispatch({ type: "loading", payload: false });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "loading", payload: false });
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error || "Invalid search parameters");
      }
    }
  };

  const closeFilterSearchBar = async () => {
    dispatch({ type: "filterSearchDropdown", payload: !data.filterSearchDropdown });
    setTitle("");
    setCategory("");
    setMaxPrice("");
    try {
      let responseData = await getAllProduct();
      if (responseData && responseData.Products) {
        dispatch({ type: "setProducts", payload: responseData.Products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${data.filterSearchDropdown ? "" : "hidden"} my-4`}>
      <hr />
      <div className="w-full flex flex-col space-y-4 py-4">
        <div className="font-medium py-2">Filter & Search</div>
        
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title" className="text-sm font-medium">
              Search by Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              type="text"
              placeholder="Enter product title..."
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="category" className="text-sm font-medium">
              Search by Category
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              type="text"
              placeholder="Enter category name..."
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="maxPrice" className="text-sm font-medium">
              Max Price <span className="text-red-500">*</span>
            </label>
            <input
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
              type="number"
              placeholder="Enter max price..."
              required
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            >
              Search
            </button>
            <div onClick={(e) => closeFilterSearchBar()} className="cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCategoryDropdown = (props) => {
  return (
    <Fragment>
      <CategoryList />
      <FilterSearch />
    </Fragment>
  );
};

export default ProductCategoryDropdown;
