import uploadFile from "../firebase/uploadFile";
import fetchData from "./utils/fetchData";
import { v4 as uuidv4 } from 'uuid'; // for get unique names for images

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
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
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
  dispatch({ type: "CLOSE_LOGIN" });
  
};

export const updateProfile = async (currentUser, updateFields, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const { name, file } = updateFields;
  let body = { name };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop;
      // upload to firebase
      const photoUrl = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoUrl };
    }
    const result = await fetchData(
      {
        url: url + "/updateProfile",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );

    if (result) {
      dispatch({ type: "UPDATE_USER", payload: { ...currentUser, ...result } });

      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          servity: "success",
          msg: "profile updated successfully",
        },
      });

      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false, file: null, photoUrl: result.photoUrl },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        servity: "error",
        msg: error.message,
      },
    });
    console.log("error", error);
  }
  dispatch({ type: "STOP_LOADING" });
};
