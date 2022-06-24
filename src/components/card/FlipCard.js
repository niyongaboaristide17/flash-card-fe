import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const bull = (
	<Box
	  component="span"
	  sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
	  •
	</Box>
  );

const FlipCard = (props) => {

	const {flashcard} = props;

	return (
		<Card sx={{ minWidth: 275}} variant="outlined">
		  <CardContent>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
			  Title
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
		  </CardContent>
		  <CardActions>
			{flashcard.isDone ? <DoneAllIcon color="success"/> : <RemoveDoneIcon onClick={props.handleOpen} sx={{ color: 'pink' }} />}
			<Button onClick={props.handleOpenDel}>Del</Button>
		  </CardActions>
		</Card>
	  );
}

export default FlipCard