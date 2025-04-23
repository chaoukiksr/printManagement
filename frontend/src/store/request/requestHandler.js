import { requests } from "@/testdata";
import { setRequests } from "./requestSlice";

export const getRequests = () => async (dispatch) => {
  const statusOrder = {
    pending: 1,
    approved: 2,
    refused: 3,
    completed: 4,
  };

  const sortedRequests = [...requests].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });
  dispatch(setRequests(sortedRequests));
};
