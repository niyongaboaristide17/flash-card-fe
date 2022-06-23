import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSnackbar } from '../../redux/slices/snackbarSlice'

const GlobalSnackbar = () => {

	const snackbar = useSelector(state => state.snackbar)
	const dispatch = useDispatch()
	const handleClose = () => { 
		dispatch(closeSnackbar())
	 }

	return (
		// <Snackbar
		// 	anchorOrigin={{ vertical: 'bottom', horizontal:'left' }}
		// 	open={true}
		// 	// onClose={handleClose}
		// 	message="I love snacks"
		// 	key={'bottom + left'}
		// />

		<Snackbar onClose={handleClose} open={snackbar.isOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} key={'bottom + left'} >
			<Alert onClose={handleClose} severity={snackbar.severity ?? 'info'} sx={{ width: '100%' }}>
				{snackbar.message ?? 'message'}
			</Alert>
		</Snackbar>
	)
}

export default GlobalSnackbar