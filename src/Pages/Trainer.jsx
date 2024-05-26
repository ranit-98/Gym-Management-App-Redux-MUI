import React from "react";
import { useQuery } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Slider from "react-slick";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { fetchTrainerData } from "../Redux/Slice/TrainerSlice";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Trainer = () => {
  const dispatch=useDispatch()
const fetchTrainer = async () => {
  const  data  = await dispatch(fetchTrainerData()); // Adjust the API endpoint as needed
  return data.payload.data;
};

  const { data: trainerData, isLoading, error } = useQuery({
    queryKey:["trainers"],
    queryFn:fetchTrainer
  })
  console.log(trainerData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl'>
      <Box
      sx={{
        backgroundImage: `url('https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Our Trainers
      </Typography>
      <Typography variant="h2">
        Meet Our Expert Trainers
      </Typography>
    </Box>
        <Slider {...settings}>
          {trainerData?.map((data) => (
            <Box key={data._id} mx={2} sx={{ width: "100%", maxWidth: "300px" }}>
              <Card
                sx={{ maxWidth: 340, height: "450px", mt: 3, backgroundColor: 'black', color: 'white', mx: 'auto',margin:'1rem' }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`${process.env.REACT_APP_BASE_URL}${data.image}`}
                    alt={data.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div" sx={{ color: 'red', textAlign: 'center' }}>
                      {data.name}
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                      {data.speciality}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default Trainer;
