"use client";

import { Grid } from "@mui/material";

import LoginScreenMedia from "../../organisms/LoginScreenMedia";
import LoginForm from "../../organisms/LoginForm";

const LoginPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <LoginScreenMedia />
      </Grid>
      <Grid item xs={12} md={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
