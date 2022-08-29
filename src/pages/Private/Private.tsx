import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import axios from "axios";
import { lazy, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { Loadable } from "../../components";
import { BottomNavBar } from "../../layout";
import { resetUser } from "../../redux/states/user";
import { PrivateRoutes, PublicRoutes } from "../../routes/routes";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";

const Memories = Loadable(lazy(() => import("./Memories")));
const Letters = Loadable(lazy(() => import("./Letters")));
const Settings = Loadable(lazy(() => import("./Settings")));

/**
 * Rutas privadas
 * @returns Layout de rutas privadas y sus rutas
 */
const Private = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const handleAuth = async () => {
	// 	try {
	// 		await axios.get("/memories/", {
	//		withCredentials: true,
	//	});
	// 	} catch (error) {
	// 		setOpen(true);
	// 	}
	// };

	// const handleClick = async () => {
	// 	//elimina el usuario en el store
	// 	dispatch(resetUser());
	// 	//redirige al login
	// 	navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
	// };
	
	// useEffect(() => {
	// 	handleAuth();
	// }, []);


	return (
		<>
			{/* <Dialog open={open}>
				<DialogTitle>{"Sesión expirada (⌒_⌒;)"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{
							"Por cuestiones de seguridad, la sesión ha expirado, por favor inicie sesión nuevamente para ver el contenido >.<."
						}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClick}>
						Salir
					</Button>
					<Button onClick={handleClick} autoFocus>
						Iniciar sesión
					</Button>
				</DialogActions>
			</Dialog> */}
			<RoutesWithNotFound>
				<Route element={<BottomNavBar />}>
					{/*	por defecto que vaya directamente a la ruta MEMORIES */}
					<Route path="/" element={<Navigate to={PrivateRoutes.MEMORIES} />} />
					<Route path={PrivateRoutes.MEMORIES} element={<Memories />} />
					<Route path={PrivateRoutes.LETTERS} element={<Letters />} />
					<Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
				</Route>
			</RoutesWithNotFound>
		</>
	);
};

export default Private;
