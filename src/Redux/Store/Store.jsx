import { configureStore } from '@reduxjs/toolkit'
import { bannerSlice } from '../Slice/BannerSlice'
import { trainerSlice } from '../Slice/TrainerSlice'
import { serviceSlice } from '../Slice/ServiceSlice'
import { serviceDetailSlice } from '../Slice/ServiceDetailSlice'
import { AuthSlice, check_token } from '../Slice/AuthSlice'
import { bookingSlice } from '../Slice/BookingSlice'
import { BlogSlice } from '../Slice/BlogSlice'
import { BlogDetailSlice } from '../Slice/BlogDetails'
import { testimonialSlice } from '../Slice/TestimonialSlice'
import { BookingReqSlice } from '../Slice/BookingReqSlice'

export const Store = configureStore({
  reducer: {
    banner:bannerSlice.reducer,
    trainer:trainerSlice.reducer,
    service:serviceSlice.reducer,
    serviceDetail:serviceDetailSlice.reducer,
    auth: AuthSlice.reducer,
    user:check_token,
    booking:bookingSlice.reducer,
    bookingReq:BookingReqSlice.reducer,
    blog:BlogSlice.reducer,
    blogDetail: BlogDetailSlice.reducer,
    testimonial: testimonialSlice.reducer
  },
})