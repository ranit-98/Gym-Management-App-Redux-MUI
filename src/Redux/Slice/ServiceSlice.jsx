import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchServiceData=createAsyncThunk('service/fetch',async()=>{
    const response=await axiosInstance.get('getservice')
    return response.data
})

export const serviceSlice=createSlice({
    name:'service',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchServiceData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchServiceData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchServiceData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})