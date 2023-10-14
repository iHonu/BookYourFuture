import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import background from "../../assets/loginbackground.jpg";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { selectorIsAuth } from "../../components/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  changePasswordUser,
  resetState,
} from "../../components/redux/passwordSlice";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);
  const success = useSelector((state) => state.password.status === "isSuccess");
  const error = useSelector((state) => state.password.status === "isError");
  const errorMessage = useSelector((state) => state.password.data);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(changePasswordUser(values));
    reset({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleBackButton = () => {
    dispatch(resetState());
    if (isAuth) {
      const route = userData?.admin === true ? "/" : "/";
      navigate(route);
    }
  };

  const showErrorValidation = (event, index) => {
    for (let i = 0; i < event?.length; i++) {
      return event[index].msg;
    }
  };

  React.useEffect(() => {}, [error]);

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
        component={Paper}
        elevation={6}
        square
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
          }}
        >
          <Box sx={{ mb: 5 }}>
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Change password
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Controller
                name="oldPassword"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    id="old-password"
                    label="Current password"
                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
                    autoComplete="current-password"
                    sx={{ minWidth: "300px" }}
                    autoFocus
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
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "New password is required",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    id="new-password"
                    label="New password"
                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
                    autoComplete="new-password"
                    sx={{ minWidth: "300px" }}
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
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm password is required",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    id="confirm-password"
                    label="Confirm password"
                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
                    autoComplete="confirm-password"
                    sx={{ minWidth: "300px" }}
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
              {success ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleBackButton}
                    sx={{
                      mt: 6,
                      minWidth: "250px",
                    }}
                  >
                    Back
                  </Button>
                  <Typography sx={{ m: 2 }} variant="body2">
                    Password successfully changed!
                  </Typography>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                    sx={{
                      mt: 6,
                      minWidth: "250px",
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, minWidth: "250px" }}
                    onClick={handleBackButton}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {error && (
                <>
                  <Typography color="error" sx={{ m: 2 }} variant="body2">
                    {errorMessage?.error ||
                      showErrorValidation(errorMessage, 0)}
                  </Typography>
                </>
              )}
              <Grid container align="center">
                <Grid item xs></Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
