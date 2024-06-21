import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { RotatingLines, ThreeCircles, ThreeDots } from "react-loader-spinner";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { loading, getAllProduct, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  //   console.log(getAllProduct);
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product Deleted Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to delete");
    }
  };
  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-gray-400 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <Link to={"/addproduct"}>
          <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">
            Add Product
          </button>
        </Link>
      </div>

      {/* table  */}
      <div className="w-full flex justify-center items-center overflow-x-auto mb-5">
        {loading ? (
          <div className=" overflow-hidden">
            <RotatingLines />
          </div>
        ) : (
          <>
            <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
              <tbody>
                <tr>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    S.No.
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                </tr>
                {getAllProduct?.map((item, index) => (
                  <tr key={index + 1} className="text-gray-300">
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                      {index + 1}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      <img src={item.productImageUrl} width={200} alt="" />
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.title}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      ₹{item.price}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.category}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.date}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-green-500  ">
                      <p
                        className="cursor-pointer text-green-700"
                        onClick={() => {
                          navigate(`/updateproduct/${item.id}`);
                        }}
                      >
                        Edit
                      </p>
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-red-500  ">
                      <div
                        onClick={() => {
                          deleteProduct(item.id);
                        }}
                        className=" cursor-pointer text-red-600"
                      >
                        {loading ? <ThreeDots></ThreeDots> : <p>Delete</p>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
