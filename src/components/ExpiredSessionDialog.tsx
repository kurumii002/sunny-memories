import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../routes/routes";
import { authService } from "../services";

interface Props {
	open: boolean;
}
const ExpiredSessionDialog = ({ open = false }: Props) => {
	//*HOOKS
	const navigate = useNavigate();

	//*HANDLERS
	const handleClick = async () => {
		authService.logout();
		//redirige al login
		navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
	};

	return (
		<Dialog open={open}>
			<DialogTitle>{"Sesión expirada (⌒_⌒;)"}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{
						"Por cuestiones de seguridad, la sesión ha expirado, por favor inicie sesión nuevamente para ver el contenido >.<."
					}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClick}>Salir</Button>
				<Button onClick={handleClick} autoFocus>
					Iniciar sesión
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ExpiredSessionDialog;
