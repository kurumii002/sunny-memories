/* eslint-disable @typescript-eslint/no-empty-function */
import { ThemeProvider } from "@emotion/react";
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface IColorModeContext {
	toggleColorMode: () => void;
	mode: PaletteMode;
}

export const ColorModeContext = createContext<IColorModeContext>({
	toggleColorMode: () => {},
	mode: "light",
});

interface Props {
	children: ReactNode;
}
export const ColorModeContextProvider = ({ children }: Props) => {
	//*STATES
	const [mode, setMode] = useState<PaletteMode>("light");

	//*MEMOS
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
			mode,
		}),
		[mode]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						light: "#b6ffff",
						main: "#81e2ff",
						dark: "#4ab0cc",
					},
					secondary: {
						light: "#ffe1ff",
						main: "#ffafcc",
						dark: "#cb7f9b",
					},
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export const useColorMode = () => useContext(ColorModeContext);
