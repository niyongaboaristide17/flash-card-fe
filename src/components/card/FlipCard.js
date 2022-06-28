import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import './FlipCard.css'

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}));

const FlipCard = (props) => {

	const { flashcard } = props;

	return (
		<div className='flip-card' style={{ minHeight: '200px' }} >
			<div className="flip-card-inner">
				<div className='flip-card-front'>
					<Card 
						sx={{ minWidth: 275, minHeight: 200, backgroundColor: "#2196f3", borderColor: "#2196f3" }}
						variant="outlined">
						<CardContent>
							<Typography sx={{ color: "#ffffff", mt: 4 }} variant="h5" component="div">
								{flashcard.title}
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div className='flip-card-back'>
					<Card sx={{ minWidth: 275, minHeight: 200 }} variant="outlined">
						<CardContent>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Description
							</Typography>
							<Typography variant="body2" component="em">
								{flashcard.description.length > 120 ? flashcard.description.substring(0, 120) + '...' : flashcard.description}
							</Typography>
							{flashcard.description.length > 120 ? <HtmlTooltip
								title={
									<React.Fragment>
										<Typography fontStyle='bold' color="inherit">Description</Typography>
										<hr/>
										<Typography textAlign='justify' variant="body2">
											{flashcard.description}
										</Typography>
									</React.Fragment>
								}
							>
								<Button>More</Button>
							</HtmlTooltip> : ''}

						</CardContent>
						<CardActions>
							{flashcard.isDone ? <DoneAllIcon color="success" /> : <RemoveDoneIcon onClick={props.handleOpen} sx={{ color: 'pink' }} />}
							<hr/>
							<Button variant='outlined' onClick={props.handleOpenUp}>UPDATE</Button>
							<Button color='error' onClick={props.handleOpenDel}>DELETE</Button>
						</CardActions>
					</Card>
				</div>
			</div>

		</div>

	);
}

export default FlipCard