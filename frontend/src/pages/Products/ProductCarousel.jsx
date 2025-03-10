import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="lg:w-[40rem] md:w-[46rem] w-full px-2"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="mt-4 flex flex-col md:flex-row justify-between">
                  <div className=" text-teal-900">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p> ₹ {price}</p> <br /> <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="flex md:flex-col justify-between md:w-[20rem] mt-2 md:mt-0 whitespace-nowrap">
                    <div className="">
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaStore className="mr-2" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaStar className="mr-2" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="">
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaStar className="mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaShoppingCart className="mr-2" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-2 md:mb-6">
                        <FaBox className="mr-2" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
