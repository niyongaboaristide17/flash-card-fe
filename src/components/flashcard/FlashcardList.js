import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { USER_FLASHCARD } from '../../graphql/Queries'
import ResponsiveAppBar from '../appBar/ResponsiveAppBar.js'
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material'
import FlipCard from '../card/FlipCard'
import FlashcardCreate from './FlashcardCreate'
import Loading from '../loading/Loading'
import FlashcardMarkDone from './FlashcardMarkDone'
import FlashcardDelete from './FlashcardDelete'
import FlashcardUpdate from './FlashcardUpdate'
function FlashcardList() {
	const [order, setOrder] = useState()
	const [open, setOpen] = useState(false);
	const [openD, setOpenD] = useState(false);
	const [openDel, setOpenDel] = useState(false);
	const [openUp, setOpenUp] = useState(false);
	const [card, setCard] = useState({})

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleOpenD = (x) => {
		setCard(x)
		setOpenD(true);
	}

	const handleOpenDel = (x) => {
		setCard(x)
		setOpenDel(true);
	}

	const handleOpenUp = (x) => {
		setCard(x)
		setOpenUp(true);
	}

	const handleCloseD = () => setOpenD(false);
	const handleCloseDel = () => setOpenDel(false);
	const handleCloseUp = () => setOpenUp(false);




	const { error, loading, data, refetch } = useQuery(USER_FLASHCARD, {
		variables: {
			order,
		}
	})

	useEffect(() => {
	}, [data])

	return (
		<div>
			<ResponsiveAppBar />
			<FlashcardDelete refetch={refetch} flashcard={card} open={openDel} handleClose={handleCloseDel}/>
			<FlashcardMarkDone refetch={refetch} flashcard={card} open={openD} handleClose={handleCloseD}/>
			<FlashcardCreate open={open} handleClose={handleClose} refetch={refetch} />
			<FlashcardUpdate refetch={refetch} open={openUp} flashcard={card} handleClose={handleCloseUp} />
			<Box sx={{ m: 2 }}>
				<Grid container spacing={4}>
					<Grid item>
						<Button onClick={handleOpen} size="small" variant="outlined">New card</Button>
					</Grid>
					<Grid item>
						<TextField onChange={(e) => setOrder(e.target.value)} value={order} label='sort' select variant="outlined" sx={{ width: '100px' }}>
							{[{ value: 'asc', label: 'asc' }, { value: 'desc', label: 'desc' }].map(option => (
								<MenuItem key={option.label} value={option.value}>
									{option.label}
								</MenuItem>
							))}

						</TextField>
					</Grid>
				</Grid>
				{loading ? <Loading/> : <Grid
					container
					alignItems="center"
					justifyContent="center"
					sx={{ mt: 1 }}
					rowSpacing={1}
					spacing={2}
					columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
					{data && data.userFlashcards.map((flashcard) => (
						<Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={flashcard.id}>
							<FlipCard flashcard={flashcard} handleOpen={()=>handleOpenD(flashcard)} handleOpenDel={()=>handleOpenDel(flashcard)} handleOpenUp={()=>handleOpenUp(flashcard)} />
						</Grid>
					))}
				</Grid>}

			</Box>

		</div>



	)
}

export default FlashcardList