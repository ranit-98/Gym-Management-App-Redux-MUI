import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchTrainerData=createAsyncThunk('trainer/fetch',async()=>{
    try{
        const response=await axiosInstance.get('gettrainer')
        return response.data
    }catch(error){
        console.log(error);
    }
})

export const trainerSlice=createSlice({
    name:'trainer',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchTrainerData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchTrainerData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchTrainerData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})