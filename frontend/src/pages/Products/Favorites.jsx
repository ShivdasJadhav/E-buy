import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="md:ml-[4%] h-screen overflow-y-scroll no-scrollbar pb-6">
      <h1 className="text-lg font-bold ml-[2rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap py-4 justify-center md:justify-start gap-4">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
