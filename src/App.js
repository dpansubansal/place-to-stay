import React from "react";
import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Notifications from "./components/Notifications";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <Loading />
      <Notifications />
      <Login />
      <NavBar />
    </>
  );
};

export default App;
