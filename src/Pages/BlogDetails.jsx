// import React from "react";
// import { useDispatch } from "react-redux";
// import { fetchBlogDetails } from "../Redux/Slice/BlogDetails";
// import { useQuery } from "@tanstack/react-query";
// import Layout from "../Layout/Layout";
// import { useParams } from "react-router-dom";
// import { CardContent, CardMedia, Typography, Grid } from "@mui/material";
// import { RotatingLines } from "react-loader-spinner";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const fetchBlogDetailsData = async (id) => {
//     const response = await dispatch(fetchBlogDetails(id));
//     return response.payload.data;
//   };

//   const { data: blogDetailData, isLoading } = useQuery({
//     queryKey: ["blogDetail"],
//     queryFn: () => fetchBlogDetailsData(id),
//   });
//   console.log(blogDetailData);
//   return (
//     <Layout>
//       {isLoading && 
//       <div
//         style={{
//           display: "grid",
//           placeItems: "center",
//           height: "100vh",
//           width: "100vw",
//         }}
//       >
//         <RotatingLines
//           visible={true}
//           height="96"
//           width="96"
//           color="blue"
//           strokeColor="blue"
//           strokeWidth="5"
//           animationDuration="0.75"
//           ariaLabel="rotating-lines-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       </div>
//       }
//       {!isLoading && (
//         <Grid container spacing={2} style={{ padding: "20px" }}>
//           <Grid item xs={8}>
//             <CardMedia
//               component="img"
//               sx={{ height: 400 }}
//               image={`${process.env.REACT_APP_BASE_URL}${blogDetailData.image}`}
//               title="green iguana"
//               style={{ objectFit: "fill" }}
//             />
//             <CardContent>
//               <Typography
//                 gutterBottom
//                 variant="h4"
//                 component="div"
//                 style={{ color: "red" }}
//               >
//                 {blogDetailData.title}
//               </Typography>
//               <Typography gutterBottom variant="h5" component="div">
//                 {blogDetailData.subtitle}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {blogDetailData.content}
//               </Typography>
//             </CardContent>
//           </Grid>
//           <Grid item xs={4}>
//             {/* This space is left empty for now, you can add content here later if needed */}
//           </Grid>
//         </Grid>
//       )}
//     </Layout>
//   );
// };

// export default BlogDetails;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogDetails } from "../Redux/Slice/BlogDetails";
import { useQuery } from "@tanstack/react-query";
import Layout from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Box,
} from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchGetBlogData } from "../Redux/Slice/BlogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const fetchBlogDetailsData = async (id) => {
    const response = await dispatch(fetchBlogDetails(id));
    return response.payload.data;
  };

  const fetchBlogs = async () => {
    const response = await dispatch(fetchGetBlogData());
    return response.payload.data;
  };

  const { data: blogDetailData, isLoading: isBlogDetailLoading } = useQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => fetchBlogDetailsData(id),
  });

  const { data: blogData, isLoading: isBlogsLoading } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchBlogs,
  });

  return (
    <Layout>
      {(isBlogDetailLoading || isBlogsLoading) && (
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
      )}
      {!isBlogDetailLoading && !isBlogsLoading && (
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item xs={8}>
            <CardMedia
              component="img"
              sx={{ height: 400 }}
              image={`${process.env.REACT_APP_BASE_URL}${blogDetailData.image}`}
              title={blogDetailData.title}
              style={{ objectFit: "fill", borderRadius: "8px" }}
              data-aos="fade-up"
            />
            <CardContent data-aos="fade-up">
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                //style={{ color: "#333", margin: "16px 0" }}
                style={{backgroundColor:'black',color:'red'}}
              >
                {blogDetailData.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{ color: "#555", margin: "8px 0" }}
              >
                {blogDetailData.subtitle}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                style={{ lineHeight: "1.6", color: "#666" }}
              >
                {blogDetailData.content}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aliquam aliquid debitis nisi totam reprehenderit et quisquam architecto facere soluta eligendi accusamus recusandae sequi cumque, hic nemo sint voluptates! Quo.
                Eligendi dolores cupiditate facere eum quae aut explicabo omnis, ipsum aliquam minus repellat maxime blanditiis enim voluptatem, doloribus amet quam voluptas. Harum iure atque, magni earum molestiae porro iusto libero.
                Voluptatem, incidunt quae? Voluptatem temporibus, optio quae autem quia repudiandae asperiores at vitae perferendis repellat pariatur officiis vero delectus placeat iste, distinctio rem perspiciatis iure consequuntur voluptas, modi facilis impedit.
                Eos repellendus animi delectus obcaecati aspernatur quibusdam nobis natus sequi autem modi, minima culpa et cum ratione laborum facilis? Ullam temporibus nihil eius excepturi nesciunt officiis explicabo dignissimos dolores iste?
                Ratione qui impedit culpa cum ullam, explicabo, voluptate repudiandae deleniti vel quis amet provident accusamus tempore aliquam ab voluptatum! Incidunt quod commodi sint provident voluptates, quaerat assumenda cupiditate eos rem.
                Expedita cupiditate odio consequatur quam officia ipsa dicta dignissimos, sunt error temporibus, enim, perspiciatis voluptatibus voluptatem recusandae commodi. Dolore fuga labore libero, quidem recusandae quasi voluptates ab quam nisi consequatur.
                Incidunt quod quis adipisci necessitatibus maxime in eius ipsam expedita, architecto asperiores, a inventore error dolorem sint, nostrum veniam quas dignissimos cum itaque! Iste pariatur repellendus illo, non quo est?
                Voluptatem cum, velit minima error laboriosam quod, magni maxime nobis numquam ullam delectus obcaecati sunt assumenda sint in totam quis nemo a adipisci sit dolore amet sequi voluptatum? Eligendi, fuga!
                Et quam eveniet quis tenetur minima, totam nisi fugit. Cupiditate doloremque a libero repellendus sapiente, ullam molestias modi delectus quisquam fugiat voluptatibus vel assumenda quasi eaque dolore ea aperiam est.
                Commodi, possimus. Cupiditate pariatur est veniam, fuga accusantium nihil nisi architecto saepe et mollitia ipsam quaerat dolores eveniet assumenda deleniti! Doloremque, nostrum itaque vero temporibus maxime accusantium porro ullam cumque.
                Minus aliquid cumque et quos soluta error odit repellendus laborum necessitatibus consequatur omnis mollitia enim quis, reiciendis voluptatem nulla quibusdam consequuntur eum rem ad possimus? Vero fuga aperiam amet exercitationem.
                Et, accusantium optio ducimus deleniti nobis labore animi beatae quibusdam blanditiis soluta doloribus, impedit aperiam, dicta nemo adipisci expedita. Praesentium quod officia deserunt molestias doloribus, eligendi nesciunt perferendis sequi natus?
                Exercitationem eligendi magni accusamus, fugiat consectetur tempore reprehenderit omnis quod minima hic quisquam ad, tenetur mollitia, eos deleniti sed natus ipsam. Dicta ipsam dolor facilis vero temporibus, eligendi natus esse.
                </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <Box data-aos="fade-left">
              <Typography variant="h3" gutterBottom style={{backgroundColor:'black',color:'red',padding:'1rem'}}>
                Recent Blogs
              </Typography>
              {blogData.slice(0,4).map((blog) => (
                <Link to={`/blogDetail/${blog._id}`} >
                <Card key={blog.id} sx={{ marginBottom: 2 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.REACT_APP_BASE_URL}${blog.image}`}
                      alt={blog.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {blog.subtitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default BlogDetails;
