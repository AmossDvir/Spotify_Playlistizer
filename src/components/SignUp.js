import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUser } from "../controllers/user/CreateUser";
import { setLoginDrawerOpen } from "../model/globalStateSlice";
import ErrorLabel from "../generalComponents/ErrorLabel";
import { loginUser } from "../model/userSlice";
import ErrorSnackBar from "../generalComponents/ErrorSnackBar";
import LoadingButton from "../generalComponents/LoadingButton";
import { routes, errorCodesLabels } from "../constants";

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState.value);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(0);

  useEffect(
    () => setError(0),
    [
      firstName,
      lastName,
      username,
      email,
      password,
      globalState.loginDrawerOpen,
    ]
  );

  useEffect(() => {
    if (error !== 0) {
      setSnackBarOpen(true);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const res = await createUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    console.log(res);
    if (res?.success) {
      console.log("Success!");
      dispatch(loginUser(res?.data));
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate(routes.home.url);
    } else {
      setError(res?.data?.response?.status ?? res?.data?.code);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <LoadingButton label="Sign Up" loading={loading}></LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  style={{ color: "black" }}
                  onClick={() => dispatch(setLoginDrawerOpen(true))}
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ErrorSnackBar
        open={snackBarOpen || !!error}
        onClose={() => {
          setError(0);
          setSnackBarOpen(false);
        }}
        promptStr={errorCodesLabels[error]}
      ></ErrorSnackBar>
    </ThemeProvider>
  );
};

export default SignUp;
