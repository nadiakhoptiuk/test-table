const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  M: null,
  N: null,
  x: null,
};

export const outputDataSlice = createSlice({
  name: 'outputData',
  initialState: initialState,
  reducers: {
    setOutputData: (_, { payload }) => {
      // const { M, N, x } = payload;
      // return { M: M, N: N, x: x };
      return payload;
    },
  },
});

export default outputDataSlice.reducer;
export const { setOutputData } = outputDataSlice.actions;
