import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import background from "../../assets/loginbackground.jpg";
import logo from "../../assets/logo.svg";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserData,
  selectorIsAuth,
} from "../../components/redux/authSlice";
import { IconButton, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.status === "isError");
  const errorMessage = useSelector((state) => state.auth.data);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showErrorValidation = (event, index) => {
    for (let i = 0; i < event?.length; i++) {
      return event[index].msg;
    }
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "byfhyf23@gmail.com",
      password: "MwjQkP0u",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));

    if (!data.payload) {
      //eslint-disable-next-line
      console.log("Failed to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  // Redirect authenticated users away from the login page
  useEffect(() => {
    if (error) {
      return navigate("/login");
    }

    if (isAuth) {
      if (userData?.admin === true) {
        navigate("/");
      } else {
        navigate("/");
      }
    }
  }, [isAuth, userData]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 10,
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Avatar src={logo} sx={{ width: 300, height: 100 }}></Avatar>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                fullWidth
                rules={{
                  required: "Email is required",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    sx={{ minWidth: 250 }}
                    margin="normal"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                fullWidth
                rules={{
                  required: "Password is required",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    sx={{ minWidth: 250, mb: 5 }}
                    margin="normal"
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
                    autoComplete="password"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {errorMessage?.message ||
                    showErrorValidation(errorMessage, 0)}
                </Typography>
              )}
              <Button
                disabled={!isValid}
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  minWidth: 250,
                  size: "medium",
                }}
              >
                Login
              </Button>
              <Grid container align="center">
                <Grid item xs>
                  <RouterLink to="/forgot-password" variant="body2">
                    Forgot password?
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
