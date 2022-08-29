import { AppBar, Box, Toolbar, Typography, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import LoyaltyTwoToneIcon from "@mui/icons-material/LoyaltyTwoTone";

interface Props {
	children: ReactNode;
}
const MainBar = ({ children }: Props) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<LoyaltyTwoToneIcon sx={{ display: { md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/home"
						sx={{
							mr: 2,
							display: { md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							flexGrow: 1,
						}}
					>
						Sunny Memories
					</Typography>
				</Toolbar>
			</AppBar>
			<CssBaseline />
			{children}
		</Box>
	);
};

export default MainBar;
