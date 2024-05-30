import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Slice/AuthSlice";
import Layout from "../Layout/Layout";
const defaultTheme = createTheme();
const Register = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLoading,setIsLoading]=useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const authState = useSelector((state) => state?.auth) || {};
  const { redirectReg, loading } = authState;
  React.useEffect(()=>{
    navigate(redirectReg)
  },[redirectReg,dispatch,navigate])
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [img, setimg] = React.useState(null);
 
  // Handle form submission
  const onSubmit = async (data) => {
  setIsLoading(true)
    console.log(data);
    const formdata = new FormData();
    console.log('aaaa',img);
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("password", data.password);
    formdata.append("answer", data.answer);
    if (img) {
      formdata.append("image", img);
    }

  
    try {
      const res=await dispatch(registerUser(formdata))
      console.log(res);
      // reset()
      
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false)
    }
  };

  // Handle image selection
  const handleImageChange = (event) => {
   console.log('img',event,event.target.files[0])
    const file = event.target.files[0];
    setimg(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={5}
            style={{
              padding: "1rem 3rem",
              marginTop: "1rem",
              width: "35rem",
              marginBottom: "1rem",
            }}
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      {...register("name", { required: true, maxLength: 20 })}
                    />
                    {errors?.name?.type === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      {...register("email", { required: true, maxLength: 50 })}
                      autoComplete="email"
                    />
                    {errors?.name?.type === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      {...register("phone", { required: true, maxLength: 20 })}
                    />
                    {errors?.name?.type === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      {...register("password", {
                        required: true,
                        maxLength: 20,
                      })}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    {errors?.name?.type === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="answer"
                      label="Answer"
                      {...register("answer", { required: true, maxLength: 20 })}
                    />
                    {errors?.name?.type === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {/* Image file input */}
                    <TextField
                      fullWidth
                      type="file"
                      accept="image/*"
                       onChange={handleImageChange}
                      id="image"
                    />
                    {/* {!img && <p style={{color:"red"}}>This field is required</p>} */}
                  </Grid>
                  {selectedImage && (
                    <Grid item xs={12}>
                      {/* Display the selected image */}
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </Grid>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                 {isLoading ? <>Loading...</>: "Sign Up"}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default Register;
