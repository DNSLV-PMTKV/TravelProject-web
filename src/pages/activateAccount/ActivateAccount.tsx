import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserRequests from '../../requests/userRequests';

type Params = {
	token: string;
};

const ActivateAccount: React.FC = () => {
	const { token } = useParams<Params>();
	const [valid, setValid] = useState('');

	useEffect(() => {
		let mounted = true;
		UserRequests.confirmAccount(token)
			.then((res) => {
				console.log('res', res);
				if (mounted) {
					setValid('true');
				}
			})
			.catch((err) => {
				console.error('err', err);
				setValid('false');
			});
		return () => {
			mounted = false;
		};
	}, []);

	const renderSuccess = (): JSX.Element => {
		return (
			<Typography variant='h2' align='center'>
				Your account has been activated.
			</Typography>
		);
	};

	const renderFailure = (): JSX.Element => {
		return (
			<Typography variant='h2' align='center'>
				You have already actived your account.
			</Typography>
		);
	};

	return (
		<Container component='div' maxWidth='md'>
			{valid === 'true' ? renderSuccess() : renderFailure()}
		</Container>
	);
};

export default ActivateAccount;
