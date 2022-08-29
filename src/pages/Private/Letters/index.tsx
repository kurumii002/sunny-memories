import { useState, useEffect } from "react";
import {
	Container,
	Grid,
	Box,
	Fab,
	Modal,
	Fade,
	Alert,
	Backdrop,
	Button,
	TextField,
} from "@mui/material";
import { MemoryCard } from "../../../components";
import { getMemories, createMemory } from "../../../services/memoryService";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { IMemory } from "../../../typings";
import yup from "yup";
import { useTheme } from "@mui/material/styles";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const Letters = () => {
	//*STATES
	const [memories, setMemories] = useState<IMemory[]>([] as IMemory[]);
	const [memoryData, setMemoryData] = useState<IMemory | null>(null);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(0);
	const theme = useTheme();

	//*HANDLERS
	const handleOpen = () => {
		setMemoryData(null); //limpia los inputs
		setOpen(true); //abre el modal
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	//*USE EFFECT -> se ejecutará cada vez que el componente se renderice
	useEffect(() => {
		// recupera todas las historias del API
		(async () => {
			setLoading(true);
			const response = await getMemories();
			const usersArray = response.data;
			setMemories(usersArray);
			setLoading(false);
		})();
	}, []);

	//*YUP VALIDATION
	// const validationEschema = yup.object({
	// 	description: yup.string().required("Campo obligatorio"),
	// });

	return (
		<Container maxWidth="xl">
			<h1>Próximamente...</h1>
		</Container>
	);
};

export default Letters;
