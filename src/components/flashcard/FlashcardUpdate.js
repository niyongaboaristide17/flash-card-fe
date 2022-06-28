import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { UPDATE_FLASHCAR_MUTATION } from '../../graphql/Mutations';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/slices/snackbarSlice';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

const FlashcardUpdate = ({ open, handleClose, refetch, flashcard }) => {


	const [updateFlashcard, { data, loading, error }] = useMutation(UPDATE_FLASHCAR_MUTATION)

	const card = {...flashcard}

	const dispatch = useDispatch()

	const [title, setTitle] = useState(flashcard.title || '')
	const [description, setDescription] = useState(flashcard.description || '')

	const handleSubmit = () => {

		updateFlashcard({
			variables: {
				id: card.id,
				input: {
					title,
					description,
				}
			}
		}).then((result) => {
			refetch()
			dispatch(openSnackbar({ message: result.data.updateFlashcard.title + ' update successfully', severity: 'success' }))
			handleClose()
		}).catch((error) => {
			dispatch(openSnackbar({ message: error.message, severity: 'error' }))
		})

	};

	useEffect(() => {

	})

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						ADD A CARD
					</Typography>

					<Box sx={{ mt: 1 }}>
						<ValidatorForm onSubmit={handleSubmit}>
							<TextValidator
								margin="normal"
								required
								fullWidth
								id="title"
								label="title"
								name="title"
								autoComplete="title"
								validators={['required']}
								autoFocus
								value={title}
								onChange={(e) => setTitle(e.target.value)}
						 	/>
							<TextValidator
								margin="normal"
								required
								fullWidth
								minRows={5}
								name="description"
								label="description"
								id="description"
								placeholder='Description'
								autoComplete="description"
								validators={['required']}
								errorMessages={['description is required']}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								{loading ? "UPDATING..." : 'UPDATE'}
							</Button>
						</ValidatorForm>


					</Box>

				</Box>
			</Modal>
		</div>
	)
}

export default FlashcardUpdate