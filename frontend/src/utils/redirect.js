import { removeLoading, setLoading } from "@/store/LoaderSlice";
import toast from "react-hot-toast";

export const redirectBaseOnRole = (role, router, dispatch = null) => {
  try {
    if (dispatch) {
      dispatch(setLoading());
    }
    
    if (role === "admin" || role === "department") {
      router.push("/admin");
    } else if (role === "teacher") {
      router.push("/teacher");
    } else if (role === "printer") {
      router.push("/printer");
    }  
  } catch (error) {
    toast.error(error.response?.data.message || "Failed to redirect");
  } finally {
    if (dispatch) {
      dispatch(removeLoading());
    }
  }
};
