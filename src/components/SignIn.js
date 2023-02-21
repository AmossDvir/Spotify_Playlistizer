import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDrawerOpen } from "../model/globalStateSlice";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../controllers/user/login";
import { errorCodesLabels } from "../constants";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import ErrorSnackBar from "../generalComponents/ErrorSnackBar";
import LoadingButton from "../generalComponents/LoadingButton";
import { UserContext } from "../context/UserContext";
import { getUserInfo } from "../controllers/user/getUserInfo";

const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState.value);
  const [userContext, setUserContext] = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(0); // 0 means no error
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => setError(0),
    [username, password, globalState.loginDrawerOpen]
  );

  useEffect(() => {
    if (error !== 0) {
      setSnackBarOpen(true);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const res = await login({ username, password });
    if (res?.data?.success) {
      // setUserContext((oldValues) => {
      //   return {
      //     ...oldValues,
      //     accessToken: res?.data?.accessToken,
      //     refreshToken: res?.refreshToken, 
      //     loggedIn: true,
      //   };
      // });
      localStorage.setItem("access_token", res?.data?.accessToken);
      const user = await getUserInfo(res?.data?.accessToken);
      setUserContext((oldValues) => {
        return { ...oldValues, ...user.data, loggedIn: true };
      });
      // dispatch(loginUser(res?.data));
      dispatch(setLoginDrawerOpen(false));
      navigate(routes.home.url);
    } else {
      setError(res?.data?.response?.status ?? res?.data?.code);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="500vw"
        sx={{ minWidth: "250px", maxWidth: "300px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username / Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <LoadingButton
              label="Sign In"
              loading={loading}
              fullWidth
            ></LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  style={{ color: "black" }}
                  onClick={() => dispatch(setLoginDrawerOpen(false))}
                  to="sign_up"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ErrorSnackBar
        open={snackBarOpen || !!error}
        onClose={() => {
          setSnackBarOpen(false);
          setError(0);
        }}
        promptStr={errorCodesLabels[error]}
      ></ErrorSnackBar>
    </ThemeProvider>
  );
};
export default SignIn;
