import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addDoc } from "firebase/firestore";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const AddProductPage = () => {
  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProductFunction = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  return (
    <div>
      {loading ? (
        <div className=" w-full h-screen flex flex-col justify-center items-center">
          <RotatingLines></RotatingLines>
          <p className=" font-semibold">Adding the Product...</p>
        </div>
      ) : (
        <div className="flex justify-center border border-black items-center h-screen">
          {/* Login Form  */}
          <div className="login_Form bg-gray-100 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
            {/* Top Heading  */}
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-gray-500 ">
                Add Product
              </h2>
            </div>

            {/* Input One  */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    title: e.target.value,
                  });
                }}
                placeholder="Product Title"
                className="bg-gray-100 text-gray-600 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
              />
            </div>

            {/* Input Two  */}
            <div className="mb-3">
              <input
                type="number"
                value={product.price}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    price: e.target.value,
                  });
                }}
                placeholder="Product Price"
                className="bg-gray-100 text-gray-600 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
              />
            </div>

            {/* Input Three  */}
            <div className="mb-3">
              <input
                type="text"
                value={product.productImageUrl}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productImageUrl: e.target.value,
                  });
                }}
                placeholder="Product Image Url"
                className="bg-gray-100 text-gray-600 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
              />
            </div>

            {/* Input Four  */}
            <div className="mb-3">
              <select
                value={product.category}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    category: e.target.value,
                  });
                }}
                className="w-full px-1 py-2 text-gray-500 bg-gray-100 border border-gray-400 rounded-md outline-none  "
              >
                <option disabled>Select Product Category</option>
                {categoryList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option
                      className=" first-letter:uppercase text-gray-600"
                      key={index}
                      value={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Input Five  */}
            <div className="mb-3">
              <textarea
                value={product.description}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    description: e.target.value,
                  });
                }}
                name="description"
                placeholder="Product Description"
                rows="5"
                className=" w-full px-2 py-1 text-gray-600 bg-gray-100 border border-gray-400 rounded-md outline-none placeholder-gray-500 "
              ></textarea>
            </div>

            {/* Add Product Button  */}
            <div className="mb-3">
              <button
                type="button"
                onClick={addProductFunction}
                className="bg-gray-500 flex justify-center items-center hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md "
              >
                {loading ? (
                  <ThreeDots height={24} color="white"></ThreeDots>
                ) : (
                  <p>Add Product</p>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;
