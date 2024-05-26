
// import React from "react";
// import { useDispatch } from "react-redux";
// import { fetchGetBlogData } from "../Redux/Slice/BlogSlice";
// import { useQuery } from "@tanstack/react-query";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Layout from "../Layout/Layout";
// import { Link } from "react-router-dom";
// import { RotatingLines } from "react-loader-spinner";
// import { CardActions } from "@mui/material";

// const RoundedDate = styled("div")({
//   backgroundColor: "red",
//   color: "white",
//   borderRadius: "50%",
//   width: "40px",
//   height: "40px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   fontWeight: "bold",
//   fontSize: "1rem",
// });

// const Blogs = () => {
//   const dispatch = useDispatch();

//   const fetchBlogs = async () => {
//     const response = await dispatch(fetchGetBlogData());
//     return response.payload.data;
//   };

//   const { data: blogData, isLoading } = useQuery({
//     queryKey: ["blogsData"],
//     queryFn: fetchBlogs,
//   });

  
//   const getRandomDate = () => {
//     // Generate a random day, month, and year within a reasonable range
//     const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
//     const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
//     const year = 2020 + Math.floor(Math.random() * 5); // Random year between 2020 and 2024

//     // Format the date as "DD/MM/YYYY"
//     return `${day}/${month}`;
//   };
//   return (
//     <Layout>
//       {isLoading ? (
//         <div
//           style={{
//             display: "grid",
//             placeItems: "center",
//             height: "100vh",
//             width: "100vw",
//           }}
//         >
//           <RotatingLines
//             visible={true}
//             height="96"
//             width="96"
//             color="blue"
//             strokeColor="blue"
//             strokeWidth="5"
//             animationDuration="0.75"
//             ariaLabel="rotating-lines-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         </div>
//       ) : (
//         <>
//           <div style={{ position: "relative", marginBottom: "15px", width: '100%', height: '400px' }}>
//             <video
//               src="/video/blogs.mp4"
//               autoPlay
//               loop
//               muted
//               style={{ width: "100%", height: "100%",objectFit:'cover' }}
//             />
//             <Typography
//               variant="h1"
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 color: "white",
//                 fontSize: "3rem",
//                 fontWeight: "bold",
//                 zIndex: 1,
//               }}
//             >
//               Blogs
//             </Typography>
//           </div>
//           <Box sx={{ flexGrow: 1, margin: "1rem" }}>
//             <Grid container spacing={2}>
//               {blogData?.map((data) => (
//                 <Grid item xs={12} md={6} key={data._id}>
//                   <Card
//                     sx={{
//                       backgroundColor: "white",
//                       borderRadius: "12px",
//                       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                     }}
//                     data-aos="zoom-in"
//                   >
//                     <CardActionArea
//                       component={Link}
//                       to={`/blogDetail/${data._id}`}
//                     >
//                       <CardMedia
//                         component="img"
//                         height="400"
//                         image={`${process.env.REACT_APP_BASE_URL}${data.image}`}
//                         alt={data.title}
//                         style={{ objectFit: "fill" }}
                       
//                       />
//                       <CardContent>
//                         <RoundedDate>{getRandomDate()}</RoundedDate>

//                         <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
//                           {data.title}
//                         </Typography>
//                         <Typography
//                           variant="subtitle1"
//                           color="textSecondary"
//                           gutterBottom
//                         >
//                           {data.subtitle}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {data.content}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         component={Link}
//                         to={`/blogDetail/${data._id}`}
//                         size="small"
//                         variant="contained"
//                         sx={{ backgroundColor: "red", color: "white" }}
//                       >
//                         Read More
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </>
//       )}
//     </Layout>
//   );
// };

// export default Blogs;

import React from "react";
import { useDispatch } from "react-redux";
import { fetchGetBlogData } from "../Redux/Slice/BlogSlice";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { CardActions } from "@mui/material";

const RoundedDate = styled("div")({
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1rem",
});

const Blogs = () => {
  const dispatch = useDispatch();

  const fetchBlogs = async () => {
    const response = await dispatch(fetchGetBlogData());
    return response.payload.data;
  };

  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchBlogs,
  });

  const getRandomDate = () => {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    return `${day}/${month}`;
  };

  return (
    <Layout>
      {isLoading ? (
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
      ) : (
        <>
          <div
            style={{
              position: "relative",
              marginBottom: "15px",
              width: "100%",
              height: "400px",
            }}
          >
            <video
              src="/video/blogs.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              Blogs
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, margin: "1rem" }}>
            <Grid container spacing={2}>
              {blogData?.map((data) => (
                <Grid item xs={12} md={12} key={data._id}>
                  <Card
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    data-aos="zoom-in"
                  >
                    <CardActionArea
                      component={Link}
                      to={`/blogDetail/${data._id}`}
                    >
                      <Grid container>
                        <Grid item xs={12} md={4}>
                          <CardMedia
                            component="img"
                            height="400"
                            image={`${process.env.REACT_APP_BASE_URL}${data.image}`}
                            alt={data.title}
                            style={{ objectFit: "fill" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <CardContent>
                            <RoundedDate>{getRandomDate()}</RoundedDate>
                            <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
                              {data.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                              {data.subtitle}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {data.content}
                              Voluptates, consequatur eos saepe facere ducimus vel velit voluptatum quas aperiam eius reprehenderit debitis minima rerum nisi, ullam repudiandae ratione est consequuntur laudantium veniam ipsa illum. Asperiores eum tempora eius?
                              Nam omnis, placeat maiores commodi, nisi eligendi quibusdam explicabo adipisci nulla quae architecto! Eius repellendus magni in. Sequi, inventore nisi odio molestias dolor placeat unde commodi similique iure modi laudantium!
                              Voluptatum tenetur aliquid dignissimos doloribus? Voluptas, vitae! Excepturi quaerat officiis assumenda. Cum quidem aut enim consequatur vel sunt adipisci accusamus rem? Exercitationem totam iusto expedita ducimus possimus! Praesentium, necessitatibus perferendis.
                              Vero ipsum quae molestiae laboriosam, laborum ratione consectetur blanditiis sint veniam tempora? Similique alias delectus quas voluptates ea consequuntur cupiditate ab fugiat! Nobis expedita debitis, aliquam dolores velit omnis itaque.
                              Quis nihil, repudiandae corporis quisquam a blanditiis explicabo reiciendis vel! Facere deleniti doloribus molestiae odit illum? Optio, cupiditate animi. Minima doloremque vitae cupiditate molestias voluptatum ducimus a expedita exercitationem quae.
                              </Typography>
                          </CardContent>
                          <CardActions>
                      <Button
                        component={Link}
                        to={`/blogDetail/${data._id}`}
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "white" }}
                      >
                        Read More
                      </Button>
                    </CardActions>
                        </Grid>
                      </Grid>
                    </CardActionArea>
                   
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Blogs;
