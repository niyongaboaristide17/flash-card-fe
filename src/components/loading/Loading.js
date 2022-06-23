import { Box, Grid } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			height='80vh'>
			<Grid item>
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			</Grid>
		</Grid>
	)
}

export default Loading