import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		height: '10vh',
		position: 'fixed',
		bottom: 0,
		width: '100%',
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
				© 2023 Здоровый выбор. Все права защищены.
			</Typography>
		</footer>
	);
};

export default Footer;
