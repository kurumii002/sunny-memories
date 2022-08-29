import { useState, useRef, SyntheticEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Paper, Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import UpcomingTwoToneIcon from "@mui/icons-material/UpcomingTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import AuthGuard from "../guards/AuthGuard";
import { PrivateRoutes } from "../routes/routes";

const BottomNavBar = () => {
	const ref = useRef<HTMLDivElement>(null);
	const location = useLocation(); //in case user visits the path directly. The BottomNavBar is able to follow suit.

	//*STATES
	const [value, setValue] = useState(location.pathname);

	//*HANDLERS
	const handleChange = (event: SyntheticEvent, newValue: any) => {
		setValue(newValue);
	};

	let memoryValue = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MEMORIES}`;
	if(value === `/${PrivateRoutes.PRIVATE}`) {
		memoryValue = `/${PrivateRoutes.PRIVATE}`;
	}

	return (
		<Box sx={{ pb: 7 }} ref={ref}>
			{/* <CssBaseline /> */}
			{/* <Outlet /> */}
			<AuthGuard/>
			<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation showLabels value={value} onChange={handleChange}>
					<BottomNavigationAction
						label="Memorias"
						component={Link}
						to={PrivateRoutes.MEMORIES}
						value={memoryValue}
						icon={<AutoAwesomeTwoToneIcon />}
					/>
					<BottomNavigationAction
						label="Cartas"
						component={Link}
						to={PrivateRoutes.LETTERS}
						value={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LETTERS}`}
						icon={<UpcomingTwoToneIcon />}
					/>
					<BottomNavigationAction
						label="Config"
						component={Link}
						to={PrivateRoutes.SETTINGS}
						value={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SETTINGS}`}
						icon={<SettingsTwoToneIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default BottomNavBar;
