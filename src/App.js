import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Notifications from "./components/Notifications";
import Loading from "./components/Loading";
import ResponsiveDrawer from "./components/medium/drawer";

const App = () => {
  return (
    <>
      <Loading />
      <Notifications />
      <Login />
      <NavBar />
      {/* <ResponsiveDrawer/> party mill */}
       
    </>
  );
};

export default App;
