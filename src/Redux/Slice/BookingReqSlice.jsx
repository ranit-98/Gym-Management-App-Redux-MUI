import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../API/AxiosInstance";

const initialState = {
  bookingStatus: 'idle'
};

export const booking = createAsyncThunk("booking", async (data) => {
  try {
    const response = await axiosInstance.post("booking", data);
    return response.data;  // Accessing the data directly from the response
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    throw error;  // Ensure the error is thrown to trigger the rejected case
  }
});

export const BookingReqSlice = createSlice({
  name: "bookingService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(booking.pending, (state) => {
        state.bookingStatus = 'submitting';
      })
      .addCase(booking.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.bookingStatus = 'success';
          toast.success(payload?.message);
          toast.success("Congratulations! Training has been booked.");
        } else {
          state.bookingStatus = 'failed';
          toast.error(payload?.message || 'Failed to book the training.');
        }
      })
      .addCase(booking.rejected, (state) => {
        state.bookingStatus = 'failed';
        toast.error('Failed to book the training.');
      });
  }
});


