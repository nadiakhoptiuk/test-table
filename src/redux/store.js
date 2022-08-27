import { configureStore } from '@reduxjs/toolkit';
import outputReducer from 'redux/outputData/outputDataSlice';

import tableReducer from './tableData/tableDataSlice';

export const store = configureStore({
  reducer: {
    tableData: tableReducer,
    outputData: outputReducer,
  },
});
