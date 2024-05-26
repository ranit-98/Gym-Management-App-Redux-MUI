import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AxiosInstance from '../../API/AxiosInstance'
export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchBlogDetails=createAsyncThunk('blogDetails',async(id)=>{
    const response=await AxiosInstance(`getblogdetails/${id}`)
    return response.data
})

export const BlogDetailSlice=createSlice({
    name:'blogDetails',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
         .addCase(fetchBlogDetails.pending,(state)=>{
            state.status=STATUSES.LOADING
         })
         .addCase(fetchBlogDetails.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
         })
         .addCase(fetchBlogDetails.rejected,(state)=>{
            state.status=STATUSES.ERROR
         })
    }

})