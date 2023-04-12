import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
} from '@material-ui/core';
import {
	AddShoppingCart as AddShoppingCartIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(1),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}));

const products = [
	{
		id: 1,
		name: 'Лекарство 1',
		description: 'Описание Лекарство 1',
		price: 9.99,
	},
	{
		id: 2,
		name: 'Лекарство 2',
		description: 'Описание Лекарство 2',
		price: 99.99,
	},
	{
		id: 3,
		name: 'Лекарство 3',
		description: 'Описание Лекарство 3',
		price: 999.99,
	},
];

const Home = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h4" align="center" gutterBottom>
				Добро пожаловать!
			</Typography>
			<Grid container spacing={2}>
				{products.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<Card className={classes.card}>
							<CardHeader title={product.name} subheader={`$${product.price}`} />
							<CardMedia className={classes.cardMedia} title={product.name} />
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{product.description}
								</Typography>
							</CardContent>
							<CardActions disableSpacing className={classes.cardActions}>
								<IconButton aria-label="add to cart">
									<AddShoppingCartIcon />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Home;
