import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchServiceDetails } from '../Redux/Slice/ServiceDetailSlice';
import { TextField, Select, MenuItem, Button, Box, Typography, Grid, Paper, Avatar, CssBaseline, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { booking } from '../Redux/Slice/BookingReqSlice';
import { fetchBookingData } from '../Redux/Slice/BookingSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from '../Layout/Layout';
import { RotatingLines } from 'react-loader-spinner';

const theme = createTheme();

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { data: serviceDetails_data } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: () => dispatch(fetchServiceDetails(id)),
    onSuccess: () => setLoading(false),
  });

  const name = localStorage.getItem('name');
  const memberId = localStorage.getItem('_id');
  const email = localStorage.getItem('email');
  const [scheme, setScheme] = useState('');
  const [price, setPrice] = useState('0');

  const serviceName = serviceDetails_data?.payload?.data?.service_name || '';

  useEffect(() => {
    if (scheme) {
      switch (scheme) {
        case "Yearly":
          setPrice("12000");
          break;
        case "Half-yearly":
          setPrice("8000");
          break;
        case "Quarterly":
          setPrice("3500");
          break;
        default:
          setPrice("0");
      }
    }
  }, [scheme]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    dispatch(booking({ name, email, scheme, price, id, memberId }));
    dispatch(fetchBookingData(memberId));
    setLoading(false)
    navigate(`/profile`);
  };

  // if (loading) {
  //   return <Layout><Typography>Loading...</Typography></Layout>;
  // }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        { !serviceName &&
            <div
              style={{
                display: "grid",
                placeItems: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="blue"
                strokeColor="blue"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
        }
        {serviceName && <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
             backgroundImage: 'url(https://source.unsplash.com/random?fitness)',
            // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Book Your Service
              </Typography>
              <h4 className='mb-4'>Start Your {serviceName} Journey Now</h4>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <input type="hidden" value={memberId} {...register('memberId')} />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  defaultValue={name}
                  autoFocus
                  {...register('name')}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={email}
                  {...register('email')}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <input type="hidden" value={id} {...register('serviceId')} />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="service_name"
                  label="Your Training"
                  name="service_name"
                  autoComplete="service_name"
                  defaultValue={serviceName}
                  {...register('service_name')}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Select
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  displayEmpty
                  defaultValue=""
                  {...register('scheme')}
                  onChange={(e) => setScheme(e.target.value)}
                >
                  <MenuItem value="" disabled>Select Your Scheme</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                  <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                </Select>
                <TextField
                  margin="normal"
                  fullWidth
                  id="price"
                  label="Price"
                  value={price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>}
      </Layout>
    </ThemeProvider>
  );
};

export default Booking;

