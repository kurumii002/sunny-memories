import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes/routes";
import { authService } from "../services";

const AuthGuard = () => {
	//si no esta autenticado que vaya al login
	if(!authService.isValidSession()) {
		return <Navigate replace to={PublicRoutes.LOGIN} />;
	}

	return <Outlet />;
};

export default AuthGuard;
