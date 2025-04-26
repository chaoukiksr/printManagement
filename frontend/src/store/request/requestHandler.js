import { requests } from "@/testdata";
import { setRequests } from "./requestSlice";

export const getRequests = () => async (dispatch) => {
  const statusOrder = {
    wait_for_printer : 1 ,
    wait_for_teacher : 2 ,
    in_progress: 3,
    completed: 4,
    refused: 5,
  };

  const sortedRequests = [...requests].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });
  dispatch(setRequests(sortedRequests));
};
