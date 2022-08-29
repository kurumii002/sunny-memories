import { Fragment } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Skeleton from "@mui/material/Skeleton";

const CardSkeleton = () => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
				action={null}
				title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
				subheader={<Skeleton animation="wave" height={10} width="40%" />}
			/>

			{/* card media */}
			<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

			<CardContent>
				<Fragment>
					<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
					<Skeleton animation="wave" height={10} width="80%" />
				</Fragment>
			</CardContent>

			<CardActions disableSpacing>
				<Skeleton animation="wave" variant="circular" width={24} height={24} />
			</CardActions>
		</Card>
	);
};

export default CardSkeleton;
