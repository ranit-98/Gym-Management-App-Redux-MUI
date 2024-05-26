import React from 'react';
import { Container, Grid, Typography, IconButton, Box, Link } from '@mui/material';
import { Twitter, Facebook, LinkedIn, Instagram, Room, Phone, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'grey.900', color: 'white', mt: 5, py: 5 }}>
      <Container>
        <Grid container spacing={5}>

          {/* Get In Touch */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>Get In Touch</Typography>
            <Typography variant="body1"><Room /> 123 Street, New York, USA</Typography>
            <Typography variant="body1"><Phone /> +012 345 67890</Typography>
            <Typography variant="body1"><Email /> info@example.com</Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" href="#"><Twitter /></IconButton>
              <IconButton color="inherit" href="#"><Facebook /></IconButton>
              <IconButton color="inherit" href="#"><LinkedIn /></IconButton>
              <IconButton color="inherit" href="#"><Instagram /></IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>Quick Links</Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Home</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>About Us</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Our Features</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Classes</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block' }}>Contact Us</Link>
            </Box>
          </Grid>

          {/* Popular Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>Popular Links</Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Home</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>About Us</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Our Features</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>Classes</Link>
              <Link href="#" color="inherit" underline="none" sx={{ display: 'block' }}>Contact Us</Link>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>Opening Hours</Typography>
            <Typography variant="body1">Monday - Friday</Typography>
            <Typography variant="body2">8.00 AM - 8.00 PM</Typography>
            <Typography variant="body1">Saturday - Sunday</Typography>
            <Typography variant="body2">2.00 PM - 8.00 PM</Typography>
          </Grid>

        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ borderTop: 1, borderColor: 'grey.800', pt: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; <Link href="#" color="inherit" underline="hover">Your Site Name</Link>. All Rights Reserved. Designed by
            <Link href="https://htmlcodex.com" color="inherit" underline="hover"> HTML Codex</Link>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
