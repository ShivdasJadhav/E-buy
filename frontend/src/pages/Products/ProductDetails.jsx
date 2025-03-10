import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="h-screen overflow-y-scroll vertical-thin-scrollbar">
      <div>
        <Link
          to="/"
          className="italic text-sm text-black font-semibold hover:underline ml-[10rem]"
        >
          &larr; Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between md:ml-[10rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[20rem] sm:w-[10rem] mr-[2rem]"
              />
              <HeartIcon product={product} />
            </div>

            <div className="px-4 md:p-0 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-teal-700">
                {product.name}
              </h2>
              <p className="xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-black">
                {product.description}
              </p>

              <p className="text-5xl my-4 text-teal-700 font-extrabold">
                ₹ {product.price}
              </p>

              <div className="flex items-center justify-between md:w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 md:w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-center md:justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className="flex justify-center md:justify-end items-center gap-2 my-2 btn-container md:mt-4">
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="px-2 py-2 w-[6rem] rounded-lg text-black bg-slate-200"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}{" "}
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-yellow-400 text-white py-2 px-4 rounded-lg "
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="md:mt-[5rem] container flex flex-wrap items-start justify-between ">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
