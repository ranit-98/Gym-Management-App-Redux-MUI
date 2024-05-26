import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchBookingData=createAsyncThunk('booking/fetch',async(id)=>{
   try{
    const response=await axiosInstance.get(`viewBooking/${id}`)
    return response.data
   }catch(error){
    console.log(error);
   }
})

export const bookingSlice=createSlice({
    name:'booking',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchBookingData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchBookingData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchBookingData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})