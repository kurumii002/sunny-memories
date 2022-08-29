import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Loadable } from "../components";
import { RoutesWithNotFound } from "../utilities";
import { PrivateRoutes, PublicRoutes } from "./routes";
import AuthGuard from "../guards/AuthGuard";
import Private from "../pages/Private/Private";

//import lazy components
const Login = Loadable(lazy(() => import("../pages/Login")));

const Router = () => {
	return (
		<Suspense fallback={<>Cargando datos...</>}>
			<BrowserRouter>
				<RoutesWithNotFound>
					{/* si el usuario ya esta logeado que vaya directamente a las rutas protegidas */}
					<Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
					<Route path="/login" element={<Login />} />
					<Route path={PublicRoutes.LOGIN} element={<Login />} />
					<Route element={<AuthGuard  />}>
						<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
					</Route>
				</RoutesWithNotFound>
			</BrowserRouter>
		</Suspense>
	);
};

export default Router;
