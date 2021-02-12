import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		spinner: {
			position: 'absolute',
			top: 'calc(50% - 3.5rem)',
			left: 'calc(50% - 3.5rem)',
			display: 'inline-block',
			width: '3.5rem',
			height: '3.5rem',
			borderRadius: '50%',
			border: 'solid 0.5rem',
			borderColor: '#ff78aa #ffffff16 #ffffff16',
			animation: '$spin 1s infinite linear'
		},
		'@keyframes spin': {
			to: {
				transform: 'rotate(360deg)'
			}
		}
	})
);
const Spinner = (): JSX.Element => {
	const classes = useStyles();
	return <div className={classes.spinner}></div>;
};

export default Spinner;
