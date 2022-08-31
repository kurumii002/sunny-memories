import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/states/user";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../routes/routes";

interface Props {
	open: boolean;
}
const ExpiredSessionDialog = ({ open = false }: Props) => {
	//*HOOKS
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//*HANDLERS
	const handleClick = async () => {
		//elimina el usuario en el store
		dispatch(resetUser());
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
