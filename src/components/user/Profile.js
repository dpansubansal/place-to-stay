import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";

const Profile = () => {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();

  console.log("state profile from profile.js",profile)
  console.log("state current user from profile.js",currentUser)

  const handleClose = () => {
    console.log("handling close");
    dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, open: false } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hss")
  };
  const handleChange = (e) => {
    console.log("handling change");
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      console.log("purl", photoUrl);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoUrl },
      });
    } else {
      console.log("executed else block")
    }
  };
  const nameRef = useRef();
  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close></Close>
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="name"
            label="name"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={currentUser?.name}
          ></TextField>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            ></input>
            <Avatar
              src={profile.photoUrl}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            ></Avatar>
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
