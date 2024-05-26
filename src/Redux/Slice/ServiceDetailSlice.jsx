import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AxiosInstance from '../../API/AxiosInstance'
export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchServiceDetails=createAsyncThunk('serviceDetails',async(id)=>{
    const response=await AxiosInstance(`getservicedetails/${id}`)
    return response.data
})

export const serviceDetailSlice=createSlice({
    name:'serviceDetail',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
         .addCase(fetchServiceDetails.pending,(state)=>{
            state.status=STATUSES.LOADING
         })
         .addCase(fetchServiceDetails.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
         })
         .addCase(fetchServiceDetails.rejected,(state)=>{
            state.status=STATUSES.ERROR
         })
    }

})