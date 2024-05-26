// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchServiceDetails } from "../Redux/Slice/ServiceDetailSlice";
// import Layout from "../Layout/Layout";
// import { CardContent, CardMedia, Container, Typography } from "@mui/material";
// import { check_token } from "../Redux/Slice/AuthSlice";
// import { RotatingLines } from "react-loader-spinner";
// // Import the action creator

// const ServiceDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   // Define the fetch function outside of the component to ensure it has a stable reference
//   const fetchServiceDetailsData = async (id) => {
//     const response = await dispatch(fetchServiceDetails(id));
//     return response.payload.data; // Assuming the payload contains the service details data
//   };

//   const {
//     data: serviceDetailData,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["serviceDetails", id],
//     queryFn: () => fetchServiceDetailsData(id),
//   });

  
//     console.log(serviceDetailData);
  

//   if (error) return <div>Error loading service details</div>;

//   return (
//     <>
//       <Layout>
//         {isLoading && (
//           <>
//             <div
//               style={{
//                 display: "grid",
//                 placeItems: "center",
//                 height: "100vh",
//                 width: "100vw",
//               }}
//             >
//               <RotatingLines
//                 visible={true}
//                 height="96"
//                 width="96"
//                 color="blue"
//                 strokeColor="blue"
//                 strokeWidth="5"
//                 animationDuration="0.75"
//                 ariaLabel="rotating-lines-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//               />
//             </div>
//           </>
//         )}
//       { !isLoading && <Container maxWidth="xl">
//           <CardMedia
//             component="img"
//             alt={serviceDetailData.service_name}
//             height="400"
//             image={`${process.env.REACT_APP_BASE_URL}${serviceDetailData.image}`}
//             style={{ objectFit: "fill" }}
//           />
//           <CardContent>
//             <Typography
//               gutterBottom
//               variant="h1"
//               component="div"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 backgroundColor: "black",
//                 color: "red",
//               }}
//             >
//               {serviceDetailData.service_name}
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               style={{ fontSize: "18px" }}
//             >
//               {serviceDetailData.service_description}
//             </Typography>
//           </CardContent>
//         </Container>}
//       </Layout>
//     </>
//   );
// };

// export default ServiceDetail;

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceDetails } from "../Redux/Slice/ServiceDetailSlice";
import Layout from "../Layout/Layout";
import { Card, CardContent, CardMedia, Container, Typography, CircularProgress, Box, Grid, Button } from "@mui/material";
import { color } from "@mui/system";

const ServiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchServiceDetailsData = async (id) => {
    const response = await dispatch(fetchServiceDetails(id));
    return response.payload.data;
  };

  const {
    data: serviceDetailData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: () => fetchServiceDetailsData(id),
  });

  if (error) return <Typography variant="h6" color="error">Error loading service details</Typography>;

  return (
    <Layout>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="xl" sx={{ my: 4 }}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  alt={serviceDetailData.service_name}
                  height="400"
                  image={`${process.env.REACT_APP_BASE_URL}${serviceDetailData.image}`}
                  sx={{ objectFit: "cover", width: '100%',marginTop:'2rem' }}
                />
                <Button size="small" variant="contained" style={{backgroundColor:'red',margin:'3rem',width:'8rem'}} ><Link to={`/bookService/${id}`} style={{textDecoration:'none',color:'white',fontSize:'22px'}}>Book</Link></Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    align="center"
                    sx={{
                      bgcolor: "black",
                      color: "red",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    {serviceDetailData.service_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 2, fontSize: "1.1rem" }}
                  >
                    {serviceDetailData.service_description}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </Layout>
  );
};

export default ServiceDetail;
