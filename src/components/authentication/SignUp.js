import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright/Copyright';
import AuthLogo from './AuthLogo';

import { CREATE_USER_MUTATION } from '../../graphql/Mutations';
import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux'
import { openSnackbar } from '../../redux/slices/snackbarSlice';

import { useNavigate } from "react-router-dom";

import { ValidationGroup } from 'mui-validate';

const theme = createTheme();

export default function SignUp() {

	const [createUser, { error, loading, data }] = useMutation(CREATE_USER_MUTATION)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		createUser({
			variables: {
				input: {
					name: data.get('name'),
					email: data.get('email'),
					password: data.get('password'),
				}
			}
		}).then((result) => {
			dispatch(openSnackbar({message: 'user created successfully! Login', severity: 'success'}))
			navigate('/signin', {replace: true})
		}).catch((error) => {
			dispatch(openSnackbar({message: error.message, severity: 'error'}))
		})
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<AuthLogo />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="name"
									label="Name"
									name="name"
									autoComplete="name"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									type="email"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? "Submitting..." : 'Sign Up'}
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/signin" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}