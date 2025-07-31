import { configureStore } from '@reduxjs/toolkit';
import leavesReducer from '../features/leaves/leaveSlice';

export default configureStore({
  reducer: {
    leaves: leavesReducer
  }
});
