import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./redux/store";
import { CssBaseline } from "@mui/material";
import { ColorModeContextProvider } from "./theme/ColorModeContext";

const App = () => {
	return (
		<ColorModeContextProvider>
			<Provider store={store}>
				<CssBaseline />
				<Routes />
			</Provider>
		</ColorModeContextProvider>
	);
};

export default App;
