import { configureStore } from '@reduxjs/toolkit';

import tableReducer from './tableDataSlice';

export const store = configureStore({
  reducer: tableReducer,
});
