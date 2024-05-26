import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceData } from "../Redux/Slice/ServiceSlice";
import { useQuery } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import ReactCardFlip from 'react-card-flip';
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { RotatingLines } from "react-loader-spinner";
import { Box } from "@mui/system";

const Service = ({ withLayout = true }) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.user);
  const { Logouttoggle, userName } = useSelector((state) => state.user);
  const isLoggedIn=localStorage.getItem('token')
  const fetchSerice = async () => {
    const response = await dispatch(fetchServiceData());
    return response?.payload.data;
  };
  const { data: serviceData, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: fetchSerice,
  });

  const [isFlipped, setIsFlipped] = useState({});

  const handleFlip = (index) => {
    setIsFlipped((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  console.log(serviceData);
  
  const serviceContent=(
    <Container maxWidth="xl">
   
 <Grid container spacing={2}>
   {serviceData?.map((data, index) => (
     <Grid item xs={12} md={6} xl={6} key={data._id}>
       <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
         <Card sx={{ maxWidth: 700 ,backgroundColor:'black',color:'white'}} >
           <CardMedia
             component="img"
             alt={data.service_name}
             height="350"
             image={`${process.env.REACT_APP_BASE_URL}${data.image}`}
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="div" color='red' fontWeight='bolder'>
               {data.service_name}
             </Typography>
             <Typography variant="body2" color='white'>
               {data.service_description.slice(0, 100)}...
             </Typography>
           </CardContent>
           <CardActions>
             <Button size="small" onClick={() => handleFlip(index)} variant="contained">Trainer Info</Button>
             <Button size="small" variant="contained" ><Link to={`/serviceDetail/${data._id}`} style={{textDecoration:'none',color:'white'}}>Details</Link></Button>
           {
            isLoggedIn &&  <Button size="small" variant="contained" ><Link to={`/bookService/${data._id}`} style={{textDecoration:'none',color:'white'}}>Book</Link></Button>
           }
           </CardActions>
         </Card>

         <Card sx={{ maxWidth: 700, backgroundColor:'black',color:'white'}}>
         <CardMedia
             component="img"
             alt={data.trainer_details.name}
             height="350"
             image={`${process.env.REACT_APP_BASE_URL}${data.trainer_details[0].image}`}
             style={{objectFit:'fill'}}
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="div" color='red' fontWeight='bolder'>
             {data.trainer_details[0].name}
             </Typography>
             <Typography variant="body2" color='white' >
               {data.trainer_details[0].experience}
             </Typography>
             <Typography variant="h6"  color='white'>
             {data.trainer_details[0].speciality}
             </Typography>
           </CardContent>
           <CardActions>
             <Button size="small" onClick={() => handleFlip(index)} variant="contained">Back</Button>
           </CardActions>
         </Card>
       </ReactCardFlip>
     </Grid>
   ))}
 </Grid>
</Container>
  )
  if (withLayout) {
    return (
      <Layout>
        {isLoading &&
        <>
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
        </>
        }
         {/* Video header */}
    <div style={{ position: 'relative', marginBottom:'15px', width: '100%', height: '400px'}}>
      <video
        src="/video/services.mp4"
        autoPlay
        loop
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
       // style={{ width: '100%', maxHeight: 'calc(100vw * 0.5625)', objectFit: 'cover' }}
      />
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
         Our Services
      </Typography>
    </div>
        { serviceContent}
      </Layout>
    );
  } else {
    return <>
     <Container maxWidth='xl'>
      <Box
      sx={{
        backgroundImage: `url('https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom:'2rem'
      }}
    >
      <Typography variant="h4" gutterBottom>
      Our Services
      </Typography>
      <Typography variant="h2">
      Information about Our Services
      </Typography>
    </Box>
   {serviceContent}
   </Container>
    </>
  }
};

export default Service;


