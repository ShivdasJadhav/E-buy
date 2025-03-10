import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { estore, estore_mob } from "../../assets/img/export";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center">
      <div className="mx-4 sm:mx-auto p-4 md:p-6 rounded-md bg-slate-100/50 w-full sm:w-64 md:w-96 z-10">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="">
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4 italic">
          <p className="">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <img
        src={estore}
        alt="e store"
        className="absolute h-screen w-full blur-sm top-0 left-0 z-0"
      />
      {/* <img
        src={estore_mob}
        alt="e store mob"
        className="absolute md:hidden h-screen w-full blur-xs z-0"
      /> */}
    </div>
  );
};

export default Login;
