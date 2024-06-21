import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { RotatingLines } from "react-loader-spinner";
import { Query, query } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection } from "firebase/firestore";
import { where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(MyContext);
  const { getAllProduct, loading, setLoading } = context;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getCategoryProducts = async () => {
    setLoading(true);
    const q = query(
      collection(fireDB, "products"),
      where("category", "==", categoryname)
    );
    const querySnapshot = await getDocs(q);
    const categoryProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(categoryProducts);
    setLoading(false);
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    getCategoryProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  //   console.log(products);

  // filter product
  //   const products = getAllProduct.filter((obj) =>
  //     obj.category.includes(categoryname)
  //   );
  // console.log(products)
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <RotatingLines></RotatingLines>
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            {/* main 2 */}
            <div className="container px-5 py-5 mx-auto">
              {/* main 3  */}
              <div className="flex flex-wrap -m-4 justify-start">
                {products.length > 0 ? (
                  <>
                    {products.map((item, index) => {
                      const { id, title, price, productImageUrl } = item;
                      return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                          <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-80  h-96 w-full"
                              src={productImageUrl}
                              alt="img"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                E-bharat
                              </h2>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {title.substring(0, 25)}
                              </h1>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                ₹{price}
                              </h1>

                              <div className="flex justify-center ">
                                {cartItems.some((p) => p.id === item.id) ? (
                                  <button
                                    onClick={() => deleteCart(item)}
                                    className=" bg-red-700 w-full text-white py-[4px] rounded-lg font-bold"
                                  >
                                    Remove from Cart
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addCart(item)}
                                    className=" bg-gray-500 w-full text-white py-[4px] rounded-lg font-bold"
                                  >
                                    Add to Cart
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className=" w-full flex flex-col mx-auto justify-center items-center">
                    <div className="flex flex-col w-full  items-centerjustify-center"></div>
                    <h1 className=" text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
