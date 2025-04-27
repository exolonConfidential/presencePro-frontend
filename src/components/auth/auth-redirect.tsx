
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "@/utils/auth";

const AuthRedirect = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const user = getUserFromToken();
    
      if (user?.role == "admin") {
       
        navigate("/admin", { replace: true });
      } else if (user?.role == "student") {
        navigate("/student", { replace: true });
      }
    
  }, [navigate]);

  return null; 
};

export default AuthRedirect;
