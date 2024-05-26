import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchTestimonialData=createAsyncThunk('testimonial/fetch',async()=>{
    const response=await axiosInstance.get('gettestimonial')
    return response.data
})

export const testimonialSlice=createSlice({
    name:'testimonial',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder 
          .addCase(fetchTestimonialData.pending,(state)=>{
             state.status=STATUSES.LOADING
          })
          .addCase(fetchTestimonialData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchTestimonialData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})