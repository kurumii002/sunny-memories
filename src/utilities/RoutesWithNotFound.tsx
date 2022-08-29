import { ReactNode, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loadable } from "../components";

const Error404 = Loadable(lazy(() => import("../pages/Error404")));

interface Props {
	children: ReactNode;
}
/**
 * Renderiza el error 404 para rutas hijas no definidas 
 * @param children Ruta hija 
 */
const RoutesWithNotFound = ({ children }: Props) => {
	return (
		<Routes>
			{children}
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default RoutesWithNotFound;
