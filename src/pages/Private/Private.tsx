import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { Loadable } from "../../components";
import { BottomNavBar } from "../../layout";
import { PrivateRoutes } from "../../routes/routes";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";

const Memories = Loadable(lazy(() => import("./Memories")));
const Letters = Loadable(lazy(() => import("./Letters")));
const Settings = Loadable(lazy(() => import("./Settings")));

/**
 * Rutas privadas
 * @returns Layout de rutas privadas y sus rutas
 */
const Private = () => {
	return (
		<>
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
