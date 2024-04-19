import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import Profile from "./Profile";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  // const testAuth = async () => {
  //   const url = process.env.REACT_APP_SERVER_URL + "/room";
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     if (!data.success) {
  //       if (response.status === 401) {
  //         dispatch({ type: "UPDATE_USER", payload: null });
  //       }
  //       throw new Error(data.message);
  //     }
  //   } catch (er) {
  //     dispatch({
  //       type: "UPDATE_ALERT",
  //       payload: { open: true, servity: "error", msg: er.message },
  //     });
  //   }
  // };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {/* <MenuItem onClick={testAuth}> */}
        <MenuItem
          onClick={() =>
            dispatch({
              type: "UPDATE_PROFILE",
              payload: {
                open: true,
                file: null,
                photoURL: currentUser?.photoURL,
              },
            })
          }
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
