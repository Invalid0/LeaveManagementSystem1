import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:4040/api';

export const fetchMyLeaves = createAsyncThunk('leaves/fetchMyLeaves', async (token) => {
  const res = await axios.get(`${API}/leave/mine`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

export const applyLeave = createAsyncThunk('leaves/applyLeave', async ({ data, token }) => {
  const res = await axios.post(`${API}/leave`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLeaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMyLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(applyLeave.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default leaveSlice.reducer;