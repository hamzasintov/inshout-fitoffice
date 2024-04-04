import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [],
  packageToBeAdded: null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackages: (state, action) => {},
    addPackage: (state, action) => {
      console.log("addPackage", action.payload);
      state.packageToBeAdded = action.payload.barcode;
    },
    getPackages: (state) => {
      return { ...state };
    },
  },
});

export const { setPackages, addPackage, getPackages } = packageSlice.actions;

export default packageSlice.reducer;

export const getPackageToBeAdded = (state: any): string | null =>
  state.package.packageToBeAdded;
