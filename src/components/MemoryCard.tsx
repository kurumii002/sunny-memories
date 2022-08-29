import * as React from "react";
import { styled } from "@mui/material/styles";

import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	Avatar,
	IconButton,
	IconButtonProps,
	Typography
} from "@mui/material";
import { red } from "@mui/material/colors";
import { IMemory } from "../typings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface IMemoryCardProps {
	memory: IMemory;
	userAvatar?: string;
}
const MemoryCard = ({ memory, userAvatar }: IMemoryCardProps) => {
	//*STATE
	const [expanded, setExpanded] = React.useState(false);
	//*HANDLER
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} alt="User avatar" src={userAvatar} />
				}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title={memory.author}
				subheader={new Date(memory.createdOn).toLocaleDateString()}
			/>
			<CardMedia
				component="img"
				height="140" //140
				image={memory.imageUrl}
				alt="Memory image"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{memory.name}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton>
					<FavoriteRoundedIcon />
				</IconButton>
				<IconButton
					onClick={() => {
						window.open(memory.imageUrl, "_blank")!.focus();
					}}
				>
					<VisibilityRoundedIcon />
				</IconButton>
				<ExpandMore expand={expanded} onClick={handleExpandClick}>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>{memory.description}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default MemoryCard;