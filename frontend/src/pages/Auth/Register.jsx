import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { estore } from "../../assets/img/export";
const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center">
      <div className="mx-4 sm:mx-auto p-4 md:p-6 rounded-md bg-slate-100/50 w-full sm:w-64 md:w-96 z-10">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="">
          <div className="my-1">
            <label
              htmlFor="name"
              className="block text-sm font-normal "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 text-sm p-2 border rounded w-full"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-1">
            <label
              htmlFor="email"
              className="block text-sm font-normal "
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 text-sm p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-1">
            <label
              htmlFor="password"
              className="block text-sm font-normal "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 text-sm p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-normal "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 text-sm p-2 border rounded w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4 italic">
          <p className="">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src={estore}
        alt="e store"
        className="absolute h-screen w-full blur-sm top-0 left-0 z-0"
      />
    </div>
  );
};

export default Register;
