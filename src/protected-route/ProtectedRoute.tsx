import { useMeQuery } from "../app/store/api/auth";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
  const { data, isLoading } = useMeQuery();

  if (isLoading) {
    return "Loading ...";
  }

  const user = data?.data;

  if (!user) {
    return <Navigate to="/sign-in" replace />
    
  }

  return <Outlet context={{ user }} />;
};