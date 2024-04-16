import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/user";
export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  //send rqst with fetch
  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "STOP_LOADING" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        servity: "success",
        msg: "acc created successfully",
      },
    });
  }

  dispatch({ type: "STOP_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  //send rqst with fetch
  const result = await fetchData(
    { url: url + "/login", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "STOP_LOADING" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        servity: "success",
        msg: "acc login successfully",
      },
    });
  }

  dispatch({ type: "STOP_LOADING" });
};
