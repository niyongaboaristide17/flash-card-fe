import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, TextareaAutosize } from '@mui/material';
import { DELETE_FLASHCAR_MUTATION } from '../../graphql/Mutations';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/slices/snackbarSlice';

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

const FlashcardDelete = ({ open, handleClose, refetch, flashcard }) => {


	const [deleteFlashcard, { data, loading, error }] = useMutation(DELETE_FLASHCAR_MUTATION)
  	const dispatch = useDispatch()

	const handleDelete = () => {

		deleteFlashcard({
		  variables: {
			input: parseInt(flashcard.id)
		  }
		}).then((result) => {
		  refetch()
		  dispatch(openSnackbar({ message: result.data.deleteFlashcard.title + ' flashcard Deleted successfully', severity: 'success' }))
		  handleClose()
		}).catch((error) => {
		  dispatch(openSnackbar({ message: error.message, severity: 'error' }))
		  handleClose()
		})
	
	  };
  
	return (
	  <div>
		<Modal
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="modal-modal-title"
		  aria-describedby="modal-modal-description"
		>
		  <Box sx={style}>
			<br/>
			<Typography id="modal-modal-title" variant="body1" component="p">
			  Are you sure you want to delete this Flash card?
			</Typography>
			<br/>
			<Typography sx={{ mb: 1.5 }} color="text.secondary">
			  title
			</Typography>
			<Typography variant="h5" component="div">
			  {flashcard.title}
			</Typography>
			<Typography sx={{ mb: 1.5 }} color="text.secondary">
			  Description
			</Typography>
			<Typography variant="body2">
				{flashcard.description }
			</Typography>
			<br/>
          <Button size="small" variant="contained" onClick={handleDelete}>Comfirm Delete</Button>{' '}
          <Button size="small" variant="contained" color="error" onClick={handleClose}>CANCEL</Button>
		  </Box>
		</Modal>
	  </div>
	)
}

export default FlashcardDelete