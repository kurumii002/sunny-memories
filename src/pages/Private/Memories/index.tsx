/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
	Container,
	Grid,
	Box,
	Fab,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	InputAdornment,
	Alert,
	Collapse,
	IconButton,
	AlertColor,
} from "@mui/material";
import { MemoryCard } from "../../../components";
import { getMemories, createMemory, uploadImage } from "../../../services/memoryService";
import { IMemory } from "../../../typings";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CardSkeleton from "../../../components/CardSkeleton";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";

interface IMessageProps {
	msg: string | undefined;
	color: AlertColor;
}
const Memories = () => {
	//*STATES
	const [memories, setMemories] = useState<IMemory[]>([] as IMemory[]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState<any>(undefined);
	const [fileName, setFileName] = useState<string | undefined>(undefined);
	const [message, setMessage] = useState<IMessageProps | undefined>(undefined);
	const [openAlert, setOpenAlert] = useState(false);
	const skeletonItems = ["1", "2", "3", "4", "5", "6"];
	const userState = useSelector((store: AppStore) => store.user);

	//*FORMIK
	const initialValues: IMemory = {
		name: "",
		description: "",
		author: "",
		createdOn: new Date(),
		imageUrl: "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("El nombre es requerido"),
		description: Yup.string().required("La descripción es requerida"),
	});

	//*HANDLERS
	//para el dialog
	const handleOpen = () => {
		setOpen(true); //abre el modal
	};
	const handleClose = () => {
		setOpen(false);
		setFile(undefined);
		setFileName(undefined);
	};
	//para el input de imagenes
	const handleFileChange = (event: any) => {
		setFile(event.target.files[0]);
		setFileName(event.target.files[0].name);
	};
	//para el boton submit
	const handleSubmit = async (values: IMemory, form: FormikHelpers<IMemory>) => {
		form.setSubmitting(true);

		//se agrega la url de la imagen
		const image_url = await uploadImage(file);
		if (image_url) {
			values.imageUrl = image_url.data;
			values.author = userState.username;

			//se hace la peticion al API
			const response = await createMemory(values);
			if (response) {
				//si se crea
				form.setSubmitting(false);
				values.createdOn = new Date(); //establece la fecha mas reciente

				setMessage({ msg: "Historia creada correctamente", color: "success" });
				setOpenAlert(true);
				setTimeout(() => {
					setOpenAlert(false);
					handleClose();
				}, 2_000);
				form.resetForm();

				return;
			} else {
				//si no se crea
				setMessage({ msg: "Hubo un error al crear", color: "error" });
				setOpenAlert(true);
				setTimeout(() => {
					setOpenAlert(false);
				}, 5_000);
			}
		} else {
			setMessage({
				msg: "La imagen es obligatoria",
				color: "warning",
			});
			setOpenAlert(true);
			setTimeout(() => {
				setOpenAlert(false);
			}, 5_000);
		}
	};

	//*OTHER
	const fetchMemories = async () => {
		const res = await getMemories();
		setMemories(res.data);
		setLoading(false);
	};

	//*USE EFFECT -> se ejecutará cada vez que el componente se renderice
	useEffect(() => {
		// recupera todas las historias del API
		fetchMemories();
	}, [memories]);

	return (
		<Container maxWidth="xl">
			<h1>Memorias 🎆</h1>

			<Box>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Crear nueva memoria</DialogTitle>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{(props) => (
							<Form noValidate autoComplete="off" style={{ marginTop: -15 }}>
								<DialogContent>
									<Collapse in={openAlert}>
										<Alert
											action={
												<IconButton
													color="inherit"
													size="small"
													onClick={() => {
														setOpenAlert(false);
													}}
												>
													<CloseRoundedIcon fontSize="inherit" />
												</IconButton>
											}
											sx={{ mb: 2 }}
											severity={message?.color}
										>
											{message?.msg}
										</Alert>
									</Collapse>
									<Field
										as={TextField}
										label="Nombre"
										name="name"
										type="text"
										margin="dense"
										variant="standard"
										fullWidth
										required
										helperText={<ErrorMessage name="name" />}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<LoyaltyRoundedIcon />
												</InputAdornment>
											),
										}}
									/>
									<Field
										as={TextField}
										multiline
										maxRows={3}
										label="Descripción"
										name="description"
										type="text"
										margin="dense"
										variant="standard"
										fullWidth
										required
										helperText={<ErrorMessage name="description" />}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<NotesRoundedIcon />
												</InputAdornment>
											),
										}}
									/>
									<Grid container spacing={2} justifyContent="center" alignItems="center">
										<Grid item xs={8}>
											<Field
												as={TextField}
												multiline
												maxRows={2}
												name="img"
												margin="dense"
												label="Imagen"
												type="text"
												fullWidth
												required
												variant="standard"
												disabled
												value={file ? fileName : undefined}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<ImageRoundedIcon />
														</InputAdornment>
													),
												}}
											/>
										</Grid>
										<Grid item xs={4} justifyContent="center" alignItems="center">
											<Button
												variant="text"
												component="label"
												fullWidth
												startIcon={<CloudUploadRoundedIcon />}
											>
												Subir imagen
												<input
													hidden
													required
													accept="image/*"
													multiple
													type="file"
													onChange={handleFileChange}
												/>
											</Button>
										</Grid>
									</Grid>
								</DialogContent>

								<DialogActions>
									<Button color="secondary" onClick={handleClose}>
										Cancelar
									</Button>
									<Button color="secondary" type="submit" disabled={props.isSubmitting}>
										{props.isSubmitting ? "Creando..." : "Crear"}
									</Button>
								</DialogActions>
							</Form>
						)}
					</Formik>
				</Dialog>
			</Box>

			<Grid container spacing={2}>
				{memories &&
					memories.map((memo, id) => (
						<Grid item xs={6} sm={3} key={id}>
							<MemoryCard memory={memo} userAvatar={userState.avatarUrl} />
						</Grid>
					))}
				{loading &&
					skeletonItems.map((item, id) => (
						<Grid item xs={6} sm={3} key={id}>
							<CardSkeleton />
						</Grid>
					))}
			</Grid>

			<Fab sx={{ position: "fixed", bottom: 80, right: 20 }} color="secondary" onClick={handleOpen}>
				<AddPhotoAlternateTwoToneIcon />
			</Fab>
			<br />
		</Container>
	);
};

export default Memories;
