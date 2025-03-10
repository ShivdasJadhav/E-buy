import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const handlerSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };
  return (
    <div className="relative">
      <div className="md:hidden">
        <button
          onClick={handlerSidebar}
          className="flex items-center z-10 outline-none "
        >
          <GiHamburgerMenu className="m-2" size={26} />
        </button>
      </div>
      <div
        style={{ zIndex: 9999 }}
        className={
          (showSidebar ? "hidden " : "block ") +
          `absolute top-0 w-[50vw] md:flex flex-col justify-between p-4 text-white bg-teal-700 md:w-[4%] md:hover:w-[15%]  h-[100vh] z-50`
        }
        id="navigation-container"
      >
        <button
          className="md:hidden absolute right-0 top-1 z-50"
          onClick={handlerSidebar}
        >
          <IoClose className="m-2 text-white" size={26} />
        </button>
        <div className="flex flex-col justify-center space-y-4 z-20">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2 border-none focus:border-none"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="md:hidden nav-item-name mt-[3rem]">HOME</span>{" "}
          </Link>

          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2 border-none focus:border-none"
          >
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="md:hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
          </Link>

          <Link to="/cart" className="flex relative">
            <div className="flex items-center transition-transform transform hover:translate-x-2 border-none focus:border-none">
              <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
              <span className="md:hidden nav-item-name mt-[3rem]">
                Cart
              </span>{" "}
            </div>

            <div className="absolute top-9">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-1 py-0 text-sm text-white bg-yellow-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                </span>
              )}
            </div>
          </Link>

          <Link to="/favorite" className="flex relative">
            <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
              <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className="md:hidden nav-item-name mt-[3rem]">
                Favorites
              </span>{" "}
              <FavoritesCount />
            </div>
          </Link>
        </div>

        <div className="absolute bottom-0">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-800 justify-between focus:outline-none"
          >
            {userInfo ? (
              <div className="flex text-white justify-center items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd size={26} />
                <span className="md:hidden nav-item-name">
                  {userInfo.username.split(" ")[0]}
                </span>{" "}
              </div>
            ) : (
              <></>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute mt-2 space-y-2 z-40 bg-yellow-400 text-white ${
                !userInfo.isAdmin ? "-top-20" : "-top-80"
              } `}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:border border-white rounded-md hover:border-2 "
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:border border-white rounded-md hover:border-2 "
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:border border-white rounded-md hover:border-2 "
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:border border-white rounded-md hover:border-2 "
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:border border-white rounded-md hover:border-2 "
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:border rounded-md border-white hover:border-2"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:border rounded-md border-white hover:border-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!userInfo && (
            <ul>
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
