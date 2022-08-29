import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

//styles
const LoaderWrapper = styled("div")({
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: 1301,
	width: "100%",
});

/**
 * @component Barra de carga en la parte superior de la página
 */
const LoadingBar = () => {
	return (
		<LoaderWrapper>
			<LinearProgress color="secondary" />
		</LoaderWrapper>
	);
};

export default LoadingBar;
