import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../components/authentication/SignIn';
import SignUp from '../components/authentication/SignUp';
import FlashcardList from '../components/flashcard/FlashcardList';
import ProtectedRoute from './ProtectedRoute';

const AllRoutes = () => (
	<Routes>
		<Route path='/' element={<Navigate to="/signin" replace={true} />} />
		<Route path='/signin' element={<SignIn />} />
		<Route path='/signup' element={<SignUp />} />
		<Route exact path='/flashcards' element={
			<ProtectedRoute redirectTo='/signin'>
				<FlashcardList />
			</ProtectedRoute>
		} />
	</Routes>
)

export default AllRoutes