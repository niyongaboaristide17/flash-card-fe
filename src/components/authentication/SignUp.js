import  React, { useState } from 'react';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const theme = createTheme();

export default function SignUp() {


	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [createUser, { error, loading, data }] = useMutation(CREATE_USER_MUTATION)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleSubmit = () => {
		createUser({
			variables: {
				input: {
					name,
					email,
					password
				}
			}
		}).then((result) => {
			dispatch(openSnackbar({ message: 'user created successfully! Login', severity: 'success' }))
			navigate('/signin', { replace: true })
		}).catch((error) => {
			dispatch(openSnackbar({ message: error.message, severity: 'error' }))
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
					<Box sx={{ mt: 3 }}>
						<ValidatorForm form="true" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextValidator
										fullWidth
										id="name"
										label="Name"
										name="name"
										validators={['required']}
										errorMessages={['this field is required']}
										autoComplete="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextValidator
										fullWidth
										validators={['required', 'isEmail']}
										errorMessages={['email is required', 'Please enter a valid email address']}
										id="email"
										label="Email Address"
										type="email"
										name="email"
										autoComplete="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextValidator
										fullWidth
										validators={['required']}
										errorMessages={['password is required']}
										name="password"
										label="Password"
										type="password"
										id="password"
										value={password}
										autoComplete="new-password"
										onChange={(e) => setPassword(e.target.value)}
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
						</ValidatorForm>
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