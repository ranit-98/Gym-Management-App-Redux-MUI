import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchGetBlogData=createAsyncThunk('blog/fetch',async()=>{
    const response=await axiosInstance.get('getblog')
    return response.data
})

export const BlogSlice=createSlice({
    name:'blog',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(build)=>{
        build
          .addCase(fetchGetBlogData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchGetBlogData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchGetBlogData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})