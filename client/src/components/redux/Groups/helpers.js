export const handleFulfilled = (state) => {
  state.status = "isSuccess";
};
export const handlePending = (state) => {
  state.status = "isLoading";
  state.data = null;
  state.error = "";
};
export const handleRejected = (state, { payload }) => {
  state.status = "isError";
  state.data = null;
  state.error = Array.isArray(payload) ? payload[0].msg : payload.message;
};
