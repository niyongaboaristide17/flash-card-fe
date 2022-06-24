import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/slices/snackbarSlice';
import { MARK_FLASHCARD_AS_DONE } from '../../graphql/Mutations';


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

const FlashcardMarkDone = ({open, handleClose, flashcard, refetch}) => {


  const [markFlashcardAsDone, { data, loading, error }] = useMutation(MARK_FLASHCARD_AS_DONE)
  const dispatch = useDispatch()

  const handleDone = () => {

    markFlashcardAsDone({
      variables: {
        input: parseInt(flashcard.id)
      }
    }).then((result) => {
      refetch()
      dispatch(openSnackbar({ message: result.data.markFlashcardAsDone.title + ' flashcard Done', severity: 'success' }))
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ARE YOU SURE?
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="p">
            Mark flashcard **{flashcard.title}** as Done!
          </Typography>
          <br/>
          <Button size="small" variant="contained" onClick={handleDone}>Comfirm</Button>{' '}
          <Button size="small" variant="contained" color="error" onClick={handleClose}>CANCEL</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default FlashcardMarkDone