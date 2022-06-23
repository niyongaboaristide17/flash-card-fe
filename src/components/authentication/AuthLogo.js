import React from 'react'

import {Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AuthLogo = () => {
	return (
		<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
			<LockOutlinedIcon />
		</Avatar>
	)
}

export default AuthLogo