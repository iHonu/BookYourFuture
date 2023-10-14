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
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  forgotPasswordUser,
  resetState,
} from "../../components/redux/passwordSlice";
import { Stack } from "@mui/material";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.password.status === "isSuccess");
  const error = useSelector((state) => state.password.status === "isError");
  const errorMessage = useSelector((state) => state.password.data);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(forgotPasswordUser(values));
    reset({
      email: "",
    });
  };

  const handleBackButton = () => {
    dispatch(resetState());
    navigate("/login");
  };

  React.useEffect(() => {}, [success, error]);

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
            my: 8,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {success ? (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Check Your Mail
              </Typography>
              <Typography variant="body2" sx={{ mb: 4 }}>
                We have sent a password recovery instruction to your email.
              </Typography>
              <Button
                variant="outlined"
                sx={{ my: 2 }}
                onClick={handleBackButton}
              >
                Go Back
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{ textAlign: "center", mb: 3 }}
                  variant="h4"
                  color="primary"
                >
                  Forgot password?
                </Typography>
                <Typography
                  sx={{ textAlign: "center", maxWidth: "300px" }}
                  variant="body2"
                >
                  Enter your email address below and we will send you reset
                  password reset.
                </Typography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
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
                    rules={{
                      required: "Email is required",
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        sx={{ minWidth: 270 }}
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

                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent={"space-between"}
                    minWidth={270}
                    sx={{ mt: 4 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid}
                      sx={{
                        m: 1,

                        size: "medium",
                      }}
                    >
                      Send Email
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{ m: 2 }}
                      onClick={handleBackButton}
                    >
                      Cancel
                    </Button>
                  </Stack>

                  {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 6 }}>
                      {errorMessage?.message}
                    </Typography>
                  )}
                </Box>
              </form>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
