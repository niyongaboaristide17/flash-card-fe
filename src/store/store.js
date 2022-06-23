import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from "../redux/slices/snackbarSlice";

const store = configureStore({
	reducer:{
		snackbar: snackbarSlice
	}
})

export default store