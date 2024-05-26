import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchBannerData=createAsyncThunk('banner/fetch',async()=>{
   try{
    const response=await axiosInstance.get('getbanner')
    return response.data
   }catch(error){
    console.log(error);
   }
})

export const bannerSlice=createSlice({
    name:'banner',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchBannerData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchBannerData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchBannerData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})