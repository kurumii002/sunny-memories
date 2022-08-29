import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "../redux/store";
import { PublicRoutes } from "../routes/routes";

const AuthGuard = () => {
	//si esta logeado el usuario debe estar en el store
	const userState = useSelector((store: AppStore) => store.user);

	//si no esta autenticado que vaya al login
	if(!userState.username) {
		return <Navigate replace to={PublicRoutes.LOGIN} />;
	}

	return <Outlet />;
};

export default AuthGuard;
