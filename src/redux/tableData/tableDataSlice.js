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

      // writing immutable state with JS native tools will look like this:
      // return [...state, payload];
    },
    incrementAmount: (state, { payload }) => {
      const { row, idToFind } = payload;

      const neededRow = state.find(el => el.M === row);
      const neededTd = neededRow.columns.find(el => el.id === idToFind);

      // writing immutable state with using Immer (for change value simplier)
      neededTd.amount = neededTd.amount + 1;

      // writing immutable state with JS native tools will look like this:

      // const { N, amount } = neededTd;
      // const newTd = { N, id: idToFind, amount: amount + 1 };
      // const filteredColumns = neededRow.columns.filter(
      //   el => el.id !== idToFind
      // );

      // const newColumns = [...filteredColumns, newTd].sort((a, b) => a.N - b.N);
      // const filteredState = state.filter(el => el.M !== row);
      // const newRow = { ...neededRow, columns: newColumns };
      // const newState = [...filteredState, newRow].sort((a, b) => a.M - b.M);

      // return newState;
    },
  },
});

export default tableDataSlice.reducer;
export const { setTableData, deleteRow, addRow, incrementAmount } =
  tableDataSlice.actions;
