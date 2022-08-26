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
      console.log(payload);

      const newState = [...state, payload];
      return newState;
    },
  },
});

export default tableDataSlice.reducer;
export const { setTableData, deleteRow, addRow } = tableDataSlice.actions;
