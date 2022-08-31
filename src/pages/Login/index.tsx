/* eslint-disable react/prop-types */
import {
	Container,
	Grid,
	TextField,
	Alert,
	Box,
	InputAdornment,
	Collapse,
	IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { authService } from "../../services";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user";
import { IUser } from "../../typings";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { MainBar } from "../../layout";
import { PrivateRoutes } from "../../routes/routes";
import jwt_decode from "jwt-decode";
import axios from "../../services/config";
import Cookies from "universal-cookie";

const Login = () => {
	//*HOOKS
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//*STATES
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [openAlert, setOpenAlert] = useState(false);
	const [fact, setFact] = useState("--");

	//*FORMIK
	const initialValues: IUser = {
		username: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Ingrese su nombre de usuario"),
		password: Yup.string().required("Ingrese su contraseña"),
	});

	//*OTHER
	const fetchFact = async () => {
		const res = await axios.get("https://api.api-ninjas.com/v1/facts?limit=1", {
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": `${process.env.REACT_APP_FACT_API_KEY}`,
			},
		});
		setFact(res.data[0].fact);
	};

	//*USE EFFECT
	useEffect(() => {
		fetchFact();
	}, []);

	//*HANDLERS
	const handleSubmit = async (data: IUser, form: FormikHelpers<IUser>) => {
		form.setSubmitting(true);

		try {
			//obtiene el token y lo establece en la cabecera
			const session = await authService.login(data);
			axios.defaults.headers.common = { Authorization: `Bearer ${session.token}` };

			//guarda los datos en el store y en la cookie
			const session_data = jwt_decode(session.token);
			dispatch(createUser(session_data));
			console.log("session", session_data);
			const cookies = new Cookies();
			//const exp = Number((session_data as any).exp);
			//cookies.set("session", session_data, { expires: new Date(exp) });
			form.setSubmitting(false);

			//redirige a las rutas privadas
			navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });

		} catch (error) {
			if (error instanceof AxiosError) {
				const error_msg = error.response?.data;
				setErrorMessage(error_msg.error);

			} else {
				console.log("error", error);
				setErrorMessage("Ocurrió un error inesperado...");
			}

			//que muestre la alerta x 5 seg
			setOpenAlert(true);
			setTimeout(() => {
				setOpenAlert(false);
			}, 5_000);
		}
	};

	return (
		<MainBar>
			<Container maxWidth="xl">
				<Grid container spacing={3} justifyContent="center">
					<Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
						<h1>Did you known..</h1>
						<p>{fact}</p>
					</Grid>
					<Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
						<h1>Acceder</h1>
						<p>{"Contenido privado, ingrese para ver (^.~)☆"}</p>
						{errorMessage && (
							<Box sx={{ marginBottom: 2 }}>
								<Collapse in={openAlert}>
									<Alert
										severity="error"
										action={
											<IconButton
												color="inherit"
												size="small"
												onClick={() => {
													setOpenAlert(false);
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										{errorMessage}
									</Alert>
								</Collapse>
							</Box>
						)}
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							{(props) => (
								<Form noValidate>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Field
												as={TextField}
												label="Nombre de usuario"
												name="username"
												type="text"
												variant="standard"
												fullWidth
												required
												error={Boolean(props.touched.username && props.errors.username)}
												helperText={<ErrorMessage name="username" />}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<AccountCircleOutlinedIcon sx={{ color: "action.active" }} />
														</InputAdornment>
													),
												}}
											/>
										</Grid>

										<Grid item xs={12}>
											<Field
												as={TextField}
												label="Contraseña"
												name="password"
												type="password"
												variant="standard"
												fullWidth
												required
												error={Boolean(props.touched.password && props.errors.password)}
												helperText={<ErrorMessage name="password" />}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<LockOutlinedIcon sx={{ color: "action.active" }} />
														</InputAdornment>
													),
												}}
											/>
										</Grid>

										<Grid item xs={12}>
											<LoadingButton
												loading={props.isSubmitting ? true : false}
												loadingPosition="start"
												variant="contained"
												color="secondary"
												type="submit"
												size="large"
												disabled={props.isSubmitting}
												startIcon={<LoginTwoToneIcon />}
												fullWidth
											>
												{props.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
											</LoadingButton>
										</Grid>

										{/* <Grid item xs={12}>
										<Button
											variant="outlined"
											color="primary"
											startIcon={<PersonAddAltTwoToneIcon />}
											size="large"
											fullWidth
										>
											Registrarse
										</Button>
									</Grid> */}
									</Grid>
								</Form>
							)}
						</Formik>
					</Grid>
				</Grid>
				<br />
			</Container>
		</MainBar>
	);
};

export default Login;
