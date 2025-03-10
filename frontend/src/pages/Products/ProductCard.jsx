import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="relative bg-white rounded-lg shadow shadow-gray-400 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-orange-700 text-white text-xs md:text-sm font-medium mr-0 px-2.5 py-0.5 rounded-full ">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full"
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-2 md:p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-sm md:text-lg text-teal-700 font-semibold">{p?.name.slice(0,20)+"..."}</h5>

          <p className="text-md md:text-xl text-black text-yellow-500">
            {p?.price?.toLocaleString("en-In", {
              style: "currency",
              currency: "inr",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-xs md:text-sm text-black">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white bg-yellow-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-1 md:p-2 rounded-full text-teal-700"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
