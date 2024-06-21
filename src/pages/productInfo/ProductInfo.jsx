import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const ProductInfo = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Delete cart");
  };

  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productDoc = doc(fireDB, "products", id);
      const productSnapshot = await getDoc(productDoc);

      if (productSnapshot.exists()) {
        // Add the `id` to the `productTemp` object
        const productTemp = {
          id: productSnapshot.id,
          ...productSnapshot.data(),
        };

        // Now `productTemp` contains both the `id` and the data from the document
        console.log(productTemp);
        setProduct(productTemp);
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to fetch data");
    }
  };
  useEffect(() => {
    getProductData();
  }, [id]);
  // console.log(id);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className=" ">
        {loading ? (
          <div className=" w-full h-screen flex flex-col justify-center items-center">
            <RotatingLines></RotatingLines>
            <p className=" font-semibold">Loading...</p>
          </div>
        ) : (
          <section className="py-5 flex  lg:py-16 font-poppins ">
            <div className="max-w-6xl px-4 mx-auto">
              <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  <div className="">
                    <div className="">
                      <img
                        className=" w-full lg:h-[39em] rounded-lg"
                        src={product.productImageUrl}
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="lg:pl-20">
                    <div className="mb-6 ">
                      <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl ">
                        {product.title}
                      </h2>
                      <div className="flex flex-wrap items-center mb-6">
                        <ul className="flex mb-4 mr-2 lg:mb-0">
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p className="inline-block text-2xl font-semibold text-gray-800 dark:text-gray-600 ">
                        <span>Rs. {product.price} /-</span>
                      </p>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-600">
                        Description :
                      </h2>
                      <p>{product.description}</p>
                    </div>

                    <div className="mb-6 " />
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.find((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deleteCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600   hover:text-gray-800  rounded-xl"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(product)}
                          className="w-full px-4 py-3 text-center text-gray-600 bg-pink-100 border border-gray-600   hover:text-gray-800  rounded-xl"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductInfo;
