import { useLocation, useNavigate } from "react-router-dom";


export const Button = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isSignInPage = location.pathname === "/sign-in";

    return (
    <button
      onClick={() => navigate(isSignInPage ? "/sign-up" : "/sign-in")}
      className="self-center ml-auto mr-10 px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 ease-in-out"
    >
      {isSignInPage ? "Sign Up" : "Sign In"}
    </button>
  );
}