import { useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../../app/store/api/auth";
import { boardsApi } from "../../app/store/api/boards";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const [signout] = useSignOutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signout().unwrap(); 
      dispatch(boardsApi.util.resetApiState());
      navigate("/sign-in");    
    } catch (err) {
     
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
    >
      Log Out
    </button>
  );
};