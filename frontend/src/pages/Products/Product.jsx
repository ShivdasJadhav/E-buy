import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] md:ml-[2rem] p-3 relative h-fit">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] rounded"
        />
        <HeartIcon product={product} />
      </div>
      <Link to={`/product/${product._id}`}>
        <div className="p-4 ">
          <h2 className="flex justify-between items-center">
            <div className="text-lg ">{product.name}</div>
            <span className="bg-teal-100 whitespace-nowrap text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300">
              $ {product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Product;
