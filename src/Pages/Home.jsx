import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerData } from "../Redux/Slice/BannerSlice";
import Carousel from "react-material-ui-carousel";
import { Box, CardMedia, Typography } from "@mui/material";
import Trainer from "./Trainer";
import Service from "./Service";
import Layout from "../Layout/Layout";
import Testimonial from "./Testimonial";
import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import MainLoader from "../Layout/MainLoader";
const Home = () => {
  const dispatch = useDispatch();
  const fetchBanner = async () => {
    const response = await dispatch(fetchBannerData()); // Replace with your API endpoint

    return response?.payload.data;
  };

  const {
    data: banner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bannerData"],
    queryFn: fetchBanner,
  });
  console.log(banner);
  return (
    <>
      {isLoading && (
        <>
          {/* <div
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
            </div> */}
          <MainLoader />
        </>
      )}
      {!isLoading && (
        <>
          <Layout>
            <Box sx={{ overflowX: "hidden" }}>
              <Carousel>
                {banner?.map((data, index) => {
                  return (
                    <>
                      <Box key={index}>
                        <CardMedia
                          component="img"
                          src={`${process.env.REACT_APP_BASE_URL}${data.image}`}
                          height="680vh"
                          style={{ objectFit: "fill" }}
                        />
                        <Box
                          style={{
                            position: "absolute",
                            top: "60%",
                            left: "40%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography variant="h2" style={{ color: "white" }}>
                            {data.title}
                          </Typography>
                          <Typography variant="body1">
                            {data.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </Carousel>

              <Trainer />

              <Service withLayout={false} />

              <Testimonial withLayout={false} />
            </Box>
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
