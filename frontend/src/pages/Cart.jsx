import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="flex justify-around items-start flex wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col px-4 md:px-0 md:w-[80%]">
              <h1 className="text-xl font-semibold mb-4">SHOPPING CART</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-1 flex-col md:flex-row pl-4">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-teal-900"
                      >
                        {item.name}
                      </Link>

                      <div className="md:mt-2 text-orange-700">
                        {item.brand}
                      </div>
                      <div className="md:mt-2 text-teal-700 font-bold">
                        ₹ {item.price}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-24">
                        <select
                          className="w-full p-1 border rounded text-black"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          className="text-red-500 md:mr-[5rem]"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash className="ml-[1rem] mt-[.5rem]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-2 w-full md:mt-8 md:w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-md font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="flex gap-4 text-xl font-bold">
                    <p className="capitalize">total cart value : </p>
                    <p>
                      ₹{" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="bg-yellow-400 mt-4 py-2 px-4 rounded-full text-md text-white text-semibold w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
