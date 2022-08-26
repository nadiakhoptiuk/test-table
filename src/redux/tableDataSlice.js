const { createSlice } = require('@reduxjs/toolkit');

export const tableDataSlice = createSlice({
  name: 'table',
  initialState: 0,
  reducers: {
    setTableData: (_, { payload }) => {
      return payload;
    },
    deleteRow: (state, { payload }) => {
      return state.filter(row => row.M !== payload);
    },
    addRow: (state, { payload }) => {
      return [...state, payload];
    },
  },
});

export default tableDataSlice.reducer;
export const { setTableData, deleteRow, addRow } = tableDataSlice.actions;
