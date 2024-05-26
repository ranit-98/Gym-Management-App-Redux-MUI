import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchTestimonialData } from '../Redux/Slice/TestimonialSlice';
import { useQuery } from '@tanstack/react-query';
import Layout from '../Layout/Layout';
import { Box, Container } from '@mui/system';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import styles from './Testimonial.module.css';

const Testimonial = ({ withLayout = true }) => {
  const dispatch = useDispatch();

  const fetchTestimonial = async () => {
    const response = await dispatch(fetchTestimonialData());
    return response.payload.data;
  };

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonial'],
    queryFn: fetchTestimonial,
  });

  console.log(testimonials);

  const testimonialContent = (
    <div className={styles.testimonialSection}>
      <div className={styles.videoBackground}>
        <video autoPlay loop muted className={styles.video}>
          <source src="/video/5320007-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.content}>
        <Container id="testimonials">
          <Box className={styles.contentBox}>
            <Typography component="h2" variant="h4" style={{ color: 'red' }}>
              Testimonials
            </Typography>
            <Typography variant="body1">
              See what our customers love about our products. Discover how we excel in
              efficiency, durability, and satisfaction. Join us for quality, innovation,
              and reliable support.
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {testimonials?.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={6} key={index} sx={{ display: 'flex' }}>
                <Card className={styles.card} sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.review}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pr: 2 }}>
                    <CardHeader
                      avatar={<Avatar src={`${process.env.REACT_APP_BASE_URL}${testimonial.image}`} />}
                      title={testimonial.client_name}
                      subheader={testimonial.service_details[0].service_name}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );

  // Conditionally render the Layout wrapper based on the withLayout prop
  if (withLayout) {
    return (
      <Layout>
        
        {!isLoading && testimonialContent}
      </Layout>
    );
  } else {
    return testimonialContent;
  }
};

export default Testimonial;
