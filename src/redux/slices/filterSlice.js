import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import serverURL from "../../serveraddress";

export const makeFilter = createAsyncThunk(
  "filter/makeFilter",
  async function (_, { rejectWithValue, dispatch, getState }) {
    try {
      let flts = getState().filter.filters;
      axios
        .post(serverURL + "projects/filter", {
          filters: flts,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.projects);
            dispatch(setProjects(response.data.projects));
          } else return "NOT OK";
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const withoutFilters = createAsyncThunk(
  "filter/withoutFilters",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      axios.get(serverURL + "projects").then((response) => {
        if (response.data.success) {
          dispatch(setProjects(response.data.projects));
          // return response.data.projects;
        } else return "NOT OK";
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  filters: {
    isFilters: false,
    sort: "new",
    vacOnly: false,
    structure: 0,
    theme: 0,
    step: 0,
    createdBy: "",
  },
  projects: [],
  status: null,
  error: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, actions) {
      state.filters.sort = actions.payload;
      console.log(state.filters.sort);
    },
    setVacOnly(state, actions) {
      state.filters.vacOnly = actions.payload;
      console.log(state.filters.vacOnly);
    },
    setStructure(state, actions) {
      state.filters.structure = actions.payload;
      console.log(state.filters.structure);
    },
    setTheme(state, actions) {
      state.filters.theme = actions.payload;
      console.log(state.filters.theme);
    },
    setStep(state, actions) {
      state.filters.step = actions.payload;
      console.log(state.filters.step);
    },
    setCreatedBy(state, actions) {
      state.filters.createdBy = actions.payload;
      console.log(state.filters.createdBy);
    },
    resetFilters(state) {
      console.log("reset");
      state.filters.vacOnly = false;
      state.filters.structure = 0;
      state.filters.theme = 0;
      state.filters.createdBy = "";
      state.filters.isFilters = false;
    },
    isFiltersOn(state) {
      state.filters.isFilters = true;
      console.log(state.filters.isFilters);
    },
    isFiltersOff(state) {
      state.filters.isFilters = false;
      console.log(state.filters.isFilters);
    },
    toggleIsFilters(state) {
      state.filters.isFilters = !state.filters.isFilters;
      console.log(state.filters.isFilters);
    },
    setProjects(state, actions) {
      state.projects = actions.payload;
    },
    getFilters(state) {
      return state.filters;
    },
  },

  extraReducers: {
    [makeFilter.pending]: (state) => {
      console.log("extraReducers pending");
      state.status = "pending";
      state.error = null;
    },
    [makeFilter.fulfilled]: (state, action) => {
      state.isFiltersOn = true;
      state.status = "ready";
      console.log("makefiter ready");
    },
    [makeFilter.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [withoutFilters.pending]: (state, action) => {
      state.error = null;
      state.status = "pending";
    },
    [withoutFilters.fulfilled]: (state, actions) => {
      resetFilters();
      state.error = null;
      state.status = "ready";
    },
    [withoutFilters.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSort,
  setVacOnly,
  setStructure,
  setTheme,
  setStep,
  setCreatedBy,
  resetFilters,
  isFiltersOn,
  isFiltersOff,
  toggleIsFilters,
  setProjects,
  getFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
