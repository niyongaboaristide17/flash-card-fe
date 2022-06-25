import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextareaAutosize } from '@mui/material';

import { CREATE_FLASHCARD_MUTATION } from '../../graphql/Mutations';
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


const FlashcardCreate = ({ open, handleClose, refetch }) => {

  const [createFlashcard, { data, loading, error }] = useMutation(CREATE_FLASHCARD_MUTATION)

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {

    createFlashcard({
      variables: {
        input: {
          title,
          description,
        }
      }
    }).then((result) => {
      refetch()
      dispatch(openSnackbar({ message: result.data.createFlashcard.title + ' successfully', severity: 'success' }))
      handleClose()
    }).catch((error) => {
      dispatch(openSnackbar({ message: error.message, severity: 'error' }))
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
            ADD A CARD
          </Typography>

          <Box   sx={{ mt: 1 }}>
            <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
            <TextareaAutosize
              margin="normal"
              required
              style={{ width: '99.5%' }}
              minRows={5}
              name="description"
              label="description"
              id="description"
              placeholder='Description'
              autoComplete="description"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "CREATING..." : 'CREATE'}
            </Button>
            </ValidatorForm>
            

          </Box>

        </Box>
      </Modal>
    </div>
  )
}

export default FlashcardCreate