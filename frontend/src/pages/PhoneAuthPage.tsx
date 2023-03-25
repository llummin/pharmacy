import React, {useState} from "react";
import {
	Button,
	Container,
	TextField,
	Typography,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
	},
	title: {
		marginBottom: theme.spacing(3),
	},
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	input: {
		marginBottom: theme.spacing(2),
	},
}));

const PhoneAuthPage = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [code, setCode] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const classes = useStyles();

	const handlePhoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: Необходимо отправить номер телефона на сервер и получить код
		setIsCodeSent(true);
	};

	const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: Необходимо отправить номер телефона и введенный код на сервер для проверки
	};

	const renderPhoneForm = () => {
		return (
			<form className={classes.form} onSubmit={handlePhoneSubmit}>
				<TextField
					className={classes.input}
					label="Номер телефона"
					variant="outlined"
					value={phoneNumber}
					onChange={(event) => setPhoneNumber(event.target.value)}
				/>
				<Button variant="contained" color="primary" type="submit">
					Получить код
				</Button>
			</form>
		);
	};

	const renderCodeForm = () => {
		return (
			<form className={classes.form} onSubmit={handleCodeSubmit}>
				<TextField
					className={classes.input}
					label="Код из СМС"
					variant="outlined"
					value={code}
					onChange={(event) => setCode(event.target.value)}
				/>
				<Button variant="contained" color="primary" type="submit">
					Войти
				</Button>
			</form>
		);
	};

	return (
		<Container className={classes.container}>
			<Typography variant="h4" className={classes.title}>
				Авторизация по номеру телефона
			</Typography>
			{isCodeSent ? renderCodeForm() : renderPhoneForm()}
		</Container>
	);
};

export default PhoneAuthPage;
