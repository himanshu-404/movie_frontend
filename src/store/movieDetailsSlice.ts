const { createSlice } = require("@reduxjs/toolkit");

const movieDetaisSlice = createSlice({
  name: "movieDetails",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },

  reducers: {
    setMovieDetails(
      state: { data: object; loading: boolean; error: String | null },
      action: { payload: object }
    ) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state: { loading: boolean }, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    setError(
      state: { error: String | null; data: any; loading: Boolean },
      action: { payload: String }
    ) {
      state.error = action.payload;
      state.loading = false;
      state.data = {};
    },
  },
});

export const { setMovieDetails, setLoading, setError } =
  movieDetaisSlice.actions;

export default movieDetaisSlice.reducer;
