import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Notifications from "./components/Notifications";
import Loading from "./components/Loading";
import ShowBus from "./components/CityBusApp/ShowBus";
import SaveLocs from "./components/CityBusApp/SaveLocs";
import SaveRoutes from "./components/CityBusApp/SaveRoutes";
import SaveBus from "./components/CityBusApp/SaveBus";
// import ResponsiveDrawer from "./components/medium/drawer";

const App = () => {
  return (
    <>
      {/* <Loading />
      <Notifications />
      <Login />
      <NavBar /> */}
      {/* <ResponsiveDrawer/> party mill */}
      <SaveLocs />
      {/* <ShowBus /> */}
      {/* <SaveRoutes /> */}
      {/* <SaveBus /> */}
    </>
  );
};

export default App;
