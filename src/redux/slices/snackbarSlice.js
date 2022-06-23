import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false
}

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		openSnackbar(state, action){
			state.isOpen = true;
			state.severity = action.payload.severity || ''
			state.message = action.payload.message || ''
		},
		closeSnackbar(state){
			state.isOpen = false;
		}
	}
})

export const {openSnackbar, closeSnackbar} = snackbarSlice.actions
export default snackbarSlice.reducer