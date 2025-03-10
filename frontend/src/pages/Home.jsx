import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <div className="md:ml-[6%] h-screen overflow-y-scroll no-scrollbar">
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between mt-[4rem] items-center px-4">
            <h1 className="text-xl md:text-[2rem] uppercase font-semibold text-teal-800">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-yellow-400 text-white font-bold rounded-full py-2 px-10 md:mr-[18rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem] pb-6">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
