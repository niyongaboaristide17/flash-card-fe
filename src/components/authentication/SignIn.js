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

import { LOGIN_MUTATION } from '../../graphql/Mutations';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/slices/snackbarSlice';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {

	const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		login({
			variables: {
				input: {
					email: formData.get('email'),
					password: formData.get('password'),
				}
			}
		}).then((result) => {
			localStorage.setItem('token', result.data.login.accessToken)
			dispatch(openSnackbar({message: 'Login successfully', severity: 'success'}))
			navigate('/flashcards', {replace: true})
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
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? "Verifying..." : 'Sign In'}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									{/* Forgot password? */}
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}