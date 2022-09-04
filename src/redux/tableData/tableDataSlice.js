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
      // writing immutable state with using Immer
      state.push(payload);
    },
    incrementAmount: (state, { payload }) => {
      const { row, idToFind } = payload;

      const neededRow = state.find(el => el.M === row);
      const neededTd = neededRow.columns.find(el => el.id === idToFind);

      // writing immutable state with using Immer
      neededTd.amount = neededTd.amount + 1;
    },
  },
});

export default tableDataSlice.reducer;
export const { setTableData, deleteRow, addRow, incrementAmount } =
  tableDataSlice.actions;
