import { removeLoading, setLoading } from "@/store/LoaderSlice";
import toast from "react-hot-toast";

export const redirectBaseOnRole = async (role, router, dispatch) => {
  try {
    dispatch(setLoading());

    if (role === "admin" || role === "department") {
      await router.push("/admin");
    } else if (role === "teacher") {
      await router.push("/teacher");
    } else if (role === "printer") {
      await router.push("/printer");
    }
  } catch (error) {
    toast.error(error.response?.data.message || "Failed to redirect");
  } finally {
    // Add a small delay to ensure the navigation has started
    setTimeout(() => {
      dispatch(removeLoading());
    }, 100);
  }
};
