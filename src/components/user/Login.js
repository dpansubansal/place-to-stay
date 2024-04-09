import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("first");
  };
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
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
            Please fill your information in the fields
          </DialogContentText>
          {isRegister && (
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
            ></TextField>
          )}
          <TextField
            autoFocus={Boolean(isRegister)}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          ></TextField>
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contaiend" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Login;
