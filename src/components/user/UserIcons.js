import { Mail, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import UserMenu from "./UserMenu";
import useCheckToken from "../../hooks/useCheckToken";

const UserIcons = () => {
  useCheckToken();
  const {
    state: { currentUser },
  } = useValue();

  console.log("cur user from user icons", currentUser);

  console.log("currentUser", currentUser);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  return (
    <Box>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent="5">
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent="20">
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title="open user settings">
        <IconButton
          onClick={(e) => {
            setAnchorUserMenu(e.currentTarget);
          }}
        >
          <Avatar src={currentUser?.photoUrl} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
};

export default UserIcons;
