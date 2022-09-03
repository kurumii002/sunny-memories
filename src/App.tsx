import Routes from "./routes";
import { CssBaseline } from "@mui/material";
import { ColorModeContextProvider } from "./theme/ColorModeContext";

const App = () => {
	return (
		<ColorModeContextProvider>
			<CssBaseline />
			<Routes />
		</ColorModeContextProvider>
	);
};

export default App;
