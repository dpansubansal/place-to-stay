import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
// import { jwtDecode } from "jwt-decode";

const GoogleOneTapLogin = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { dispatch } = useValue();

  const handleCallBack = (resp) => {
    console.log("resp", resp);
    // const token = resp.credential;
  };
  const handleGoogleLogIn = () => {
    setIsDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallBack,
      });
      // window.google.accounts.id.prompt((notification) => {
      //   // if (notification.isNotDisplayed()) {
      //   //   throw new Error('Try to clear the cookies or try again later!');
      //   // }
      //   // if (
      //   //   notification.isSkippedMoment() ||
      //   //   notification.isDismissedMoment()
      //   // ) {
      //   //   setIsDisabled(false);
      //   // }
      // });
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallBack,
    });
    window.google.accounts.id.renderButton(document.getElementById("g-in"), {
      theme: "outlined",
      size: "large",
    });
  }, []);
  return (
    <>
      {/* working */}
      <div id="g-in"></div>

      {/* not working */}
      <Button
        variant="outlined"
        startIcon={<Google />}
        disabled={isDisabled}
        onClick={handleGoogleLogIn}
      >
        Login with Google
      </Button>
    </>
  );
};

export default GoogleOneTapLogin;
