import React, {useState} from "react";
import {
	Button,
	Container,
	Typography,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	table: {
		minWidth: 650,
	},
	button: {
		marginTop: theme.spacing(2),
	},
}));

const CartPage = () => {
	const classes = useStyles();
	const [cartItems, setCartItems] = useState([
		{id: 1, name: "Парацетамол", price: 9.99, quantity: 2},
		{id: 2, name: "Ибупрофен", price: 8.99, quantity: 1},
	]);

	const getTotalPrice = () => {
		return cartItems.reduce(
			(total, currentItem) => total + currentItem.price * currentItem.quantity,
			0
		);
	};

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		setCartItems((prevState) =>
			prevState.map((item) =>
				item.id === itemId ? {...item, quantity: newQuantity} : item
			)
		);
	};

	return (
		<Container className={classes.container}>
			<Typography variant="h4" gutterBottom>
				Корзина
			</Typography>
			{cartItems.length > 0 ? (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Наименование</TableCell>
								<TableCell align="right">Количество</TableCell>
								<TableCell align="right">Цена за единицу</TableCell>
								<TableCell align="right">Итого</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cartItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell component="th" scope="row">
										{item.name}
									</TableCell>
									<TableCell align="right">
										<input
											type="number"
											min="1"
											value={item.quantity}
											onChange={(event) =>
												handleQuantityChange(item.id, Number(event.target.value))
											}
										/>
									</TableCell>
									<TableCell align="right">{item.price} руб.</TableCell>
									<TableCell align="right">
										{(item.price * item.quantity).toFixed(2)} руб.
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell colSpan={3} align="right">
									Итого:
								</TableCell>
								<TableCell align="right">{getTotalPrice().toFixed(2)} руб.</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Button className={classes.button} variant="contained" color="primary">
						Оформить заказ
					</Button>
				</TableContainer>
			) : (
				<Typography>Ваша корзина пуста</Typography>
			)}
		</Container>
	);
};

export default CartPage;
