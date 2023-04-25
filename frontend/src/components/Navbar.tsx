import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core';
import {
	Menu as MenuIcon,
	LocalPharmacy as PharmacyIcon,
	ShoppingCart as ShoppingCartIcon,
	AccountCircle as AccountIcon,
} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#319e9a'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
	toolbar: {
		[theme.breakpoints.down('sm')]: {
			paddingRight: 0,
		},
	},
	grow: {
		flexGrow: 1,
	},
	rightIcons: {
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}));

const Navbar: React.FC = () => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerToggle}>
					<MenuIcon/>
				</IconButton>
			</div>
			<Divider/>
			<List>
				{['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((text, index) => (
					<Link to="/" className={classes.link} key={text}>
						<ListItem button>
							<ListItemIcon>{index % 2 === 0 ? <PharmacyIcon/> : <PharmacyIcon/>}</ListItemIcon>
							<ListItemText primary={text}/>
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar position="sticky" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Link to="/" className={classes.link}>
						<Typography variant="h6" className={classes.title}>
							Здоровый выбор
						</Typography>
					</Link>
					<div className={classes.grow} />
					<div className={classes.rightIcons}>
						<Link to="/cart" className={classes.link}>
							<IconButton color="inherit">
								<Badge badgeContent={3} color="secondary">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Link>
						<Link to="/login" className={classes.link}>
							<IconButton color="inherit">
								<AccountIcon />
							</IconButton>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Drawer
					variant="temporary"
					anchor="left"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</div>
	);
};

export default Navbar;