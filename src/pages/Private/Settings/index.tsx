import { useState, useContext } from "react";
import { Container, Button } from "@mui/material";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Switch,
	Divider,
} from "@mui/material";
import Brightness4TwoToneIcon from "@mui/icons-material/Brightness4TwoTone";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PublicRoutes } from "../../../routes/routes";
import { resetUser } from "../../../redux/states/user";
import { ColorModeContext } from "../../../theme/ColorModeContext";
import * as authService from "../../../services";

const UserProfile = () => {
	//*HOOKS
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { toggleColorMode } = useContext(ColorModeContext);
	
	//*STATES
	const [checked, setChecked] = useState(false);

	//*HANDLERS
	const handleToggle = () => {
		setChecked(!checked);
		toggleColorMode();
	};

	const handleLogout = async () => {
		const res = await authService.logout();
		console.log("res", res);

		//elimina el usuario del store
		dispatch(resetUser());
		//redirige al login
		navigate(PublicRoutes.LOGIN, { replace: true });
	};

	return (
		<Container maxWidth="xl">
			<h1>Configuraciones ⚙️</h1>

			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				subheader={<ListSubheader>Aplicación</ListSubheader>}
			>
				<ListItem>
					<ListItemIcon>
						<Brightness4TwoToneIcon />
					</ListItemIcon>
					<ListItemText id="switch-list-label-darkmode" primary="Modo oscuro" />
					<Switch edge="end" color="secondary" onChange={handleToggle} checked={checked} />
				</ListItem>
			</List>
			<Divider />
			<List sx={{ width: "100%", bgcolor: "background.paper" }}>
				<ListItem>
					<Button
						variant="outlined"
						color="error"
						startIcon={<MeetingRoomTwoToneIcon />}
						size="large"
						fullWidth
						onClick={handleLogout}
					>
						Cerrar sesión
					</Button>
				</ListItem>
			</List>
		</Container>
	);
};

export default UserProfile;
