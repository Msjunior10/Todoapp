import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';

// DATE PICKER IMPORTS
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { v4 as uuidv4 } from "uuid";

// ICONS
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import Todo from "./Todo";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// OTHERS
import { useTodos, useTodosDispatch } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";
import { useState, useEffect, useMemo, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

// import { TodosContext } from "../contexts/todosContext";
export default function TodoList() {

	const todos = useTodos();
	const dispatch = useTodosDispatch();
	const { showHideToast } = useToast();

	const [dialogTodo, setDialogTodo] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showUpdateDialog, setShowUpdateDialog] = useState(false);
	const [titleInput, setTitleInput] = useState("");
	const [displayedTodosType, setDisplayedTodosType] = useState("all");
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	// filteration arrays

	const completedTodos = useMemo(() => {
		return todos.filter((t) => {
			console.log("calling completed todos");
			return t.isCompleted;
		});
	}, [todos]);

	const notCompletedTodos = useMemo(() => {
		return todos.filter((t) => {
			console.log("calling not completed todos");
			return !t.isCompleted;
		});
	}, [todos]);

	let todosToBeRendered = todos;

	if (displayedTodosType == "completed") {
		todosToBeRendered = completedTodos;
	} else if (displayedTodosType == "non-completed") {
		todosToBeRendered = notCompletedTodos;
	} else {
		todosToBeRendered = todos;
	}

	useEffect(() => {
		dispatch({ type: "get" });
	}, []);

	// ===== HANDLERS
	function changeDisplayedType(e) {
		setDisplayedTodosType(e.target.value);
	}

	function handleAddClick() {
		dispatch({ 
			type: "added", 
			payload: { 
				newTitle: titleInput,
				startTime: startTime,
				endTime: endTime
			} 
		});
		setTitleInput("");
		setStartTime(null);
		setEndTime(null);
		showHideToast("Added Successfully");
	}

	function openDeleteDialog(todo) {
		setDialogTodo(todo);
		setShowDeleteDialog(true);
	}

	function openUpdateDialog(todo) {
		setDialogTodo(todo);
		setShowUpdateDialog(true);
	}

	function handleDeleteDialogClose() {
		setShowDeleteDialog(false);
	}

	function handleDeleteConfirm() {
		dispatch({ type: "deleted", payload: dialogTodo });
		setShowDeleteDialog(false);
		showHideToast("Deleted Successfully");
	}

	function handleUpdateClose() {
		setShowUpdateDialog(false);
	}

	function handleUpdateConfirm() {
		dispatch({ type: "updated", payload: dialogTodo });
		setShowUpdateDialog(false);
		showHideToast("Updated Successfully");
	}


	const todosJsx = todosToBeRendered.map((t) => {
		return (
			<Todo
				key={t.id}
				todo={t}
				showDelete={openDeleteDialog}
				showUpdate={openUpdateDialog}
			/>
		);
	});

	return (
		<>
			{/* DELETE DIALOG */}
			<Dialog
				style={{ direction: "ltr" }}
				onClose={handleDeleteDialogClose}
				open={showDeleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are you sure you want to delete this task?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You cannot undo the deletion after it is completed.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button 
						onClick={handleDeleteDialogClose}
						sx={{ border: "3px solid black" }}
					>
						Close
					</Button>
					<Button 
						autoFocus 
						onClick={handleDeleteConfirm}
						sx={{ border: "3px solid black" }}
					>
						Yes, Delete!
					</Button>
				</DialogActions>
			</Dialog>
			{/* === DELETE DIALOG === */}

			{/* UPDATE DIALOG */}
			<Dialog
				style={{ direction: "ltr" }}
				onClose={handleUpdateClose}
				open={showUpdateDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Edit task</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label=" Task Title"
						fullWidth
						variant="standard"
						value={dialogTodo?.title}
						onChange={(e) => {
							setDialogTodo({
								...dialogTodo,
								title: e.target.value,
							});
						}}
						sx={{
							"& .MuiInput-root:before": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root:after": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root:hover:not(.Mui-disabled):before": {
								borderBottom: "3px solid black",
							},
							"& .MuiInputLabel-root": {
								color: "rgba(128, 128, 128, 0.7)",
								fontSize: "1.1rem",
								fontWeight: "normal",
							},
							"& .MuiInputLabel-root:hover": {
								color: "black",
								fontWeight: "bold",
							},
							"& .MuiInputLabel-root.Mui-focused": {
								color: "black",
								fontSize: "1.3rem",
								fontWeight: "bold",
							}
						}}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="name"
						label=" Task Details"
						fullWidth
						variant="standard"
						value={dialogTodo?.details}
						onChange={(e) => {
							setDialogTodo({
								...dialogTodo,
								details: e.target.value,
							});
						}}
						sx={{
							"& .MuiInput-root:before": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root:after": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root": {
								borderBottom: "3px solid black",
							},
							"& .MuiInput-root:hover:not(.Mui-disabled):before": {
								borderBottom: "3px solid black",
							},
							"& .MuiInputLabel-root": {
								color: "rgba(128, 128, 128, 0.7)",
								fontSize: "1.1rem",
								fontWeight: "normal",
							},
							"& .MuiInputLabel-root:hover": {
								color: "black",
								fontWeight: "bold",
							},
							"& .MuiInputLabel-root.Mui-focused": {
								color: "black",
								fontSize: "1.3rem",
								fontWeight: "bold",
							}
						}}
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['TimePicker', 'TimePicker']}>
							<TimePicker
								label="Start time"
								value={startTime}
								onChange={(newValue) => setStartTime(newValue)}
								sx={{
									"& .MuiOutlinedInput-root": {
										border: "3px solid black",
									},
									"& .MuiOutlinedInput-root:hover": {
										border: "3px solid black",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "black",
										}
									},
									"& .MuiOutlinedInput-root.Mui-focused": {
										border: "3px solid black",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "black",
										}
									},
									"& .MuiInputLabel-root": {
										color: "rgba(128, 128, 128, 0.7)",
										fontSize: "1.1rem",
										fontWeight: "normal",
									},
									"& .MuiInputLabel-root:hover": {
										color: "black",
										fontWeight: "bold",
									},
									"& .MuiInputLabel-root.Mui-focused": {
										color: "black",
										fontSize: "1.3rem",
										fontWeight: "bold",
									},
									"& .MuiOutlinedInput-notchedOutline": {
										borderColor: "black",
									}
								}}
							/>
							<TimePicker
								label="End time"
								value={endTime}
								onChange={(newValue) => setEndTime(newValue)}
								sx={{
									"& .MuiOutlinedInput-root": {
										border: "3px solid black",
									},
									"& .MuiOutlinedInput-root:hover": {
										border: "3px solid black",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "black",
										}
									},
									"& .MuiOutlinedInput-root.Mui-focused": {
										border: "3px solid black",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "black",
										}
									},
									"& .MuiInputLabel-root": {
										color: "rgba(128, 128, 128, 0.7)",
										fontSize: "1.1rem",
										fontWeight: "normal",
									},
									"& .MuiInputLabel-root:hover": {
										color: "black",
										fontWeight: "bold",
									},
									"& .MuiInputLabel-root.Mui-focused": {
										color: "black",
										fontSize: "1.3rem",
										fontWeight: "bold",
									},
									"& .MuiOutlinedInput-notchedOutline": {
										borderColor: "black",
									}
								}}
							/>
						</DemoContainer>
					</LocalizationProvider>



				</DialogContent>
				<DialogActions>
					<Button 
						onClick={handleUpdateClose}
						sx={{ border: "3px solid black" }}
					>
						Close
					</Button>
					<Button 
						autoFocus 
						onClick={handleUpdateConfirm}
						sx={{ border: "3px solid black" }}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
			{/* === UPDATE DIALOG */}

			<Container maxWidth="sm">
				<Card
					sx={{ minWidth: 275 }}
					style={{
						maxHeight: "80vh",
						overflow: "auto", // Auto visar scroll bara när det behövs
						boxShadow: "10px 10px 80px 20px rgba(255, 255, 255, 1)",
						border: "solid 5px",
						borderColor: "black",
					}}
				>
					<CardContent>
						<Typography variant="h2" style={{ fontWeight: "bold" }}>
							My Tasks
						</Typography>
						<Divider 
							sx={{ 
								height: "3px", 
								backgroundColor: "black",
								border: "none"
							}} 
						/>

						{/* FILTER BUTTONS */}
						<ToggleButtonGroup
							style={{ direction: "ltr", marginTop: "30px" }}
							value={displayedTodosType}
							exclusive
							onChange={changeDisplayedType}
							aria-label="text alignment"
							color="primary"
							sx={{
								"& .MuiToggleButton-root": {
									border: "3px solid black",
								}
							}}
						>
							<ToggleButton value="non-completed">
								Non-Completed
							</ToggleButton>
							<ToggleButton value="completed">
								Completed
							</ToggleButton>
							<ToggleButton value="all">All</ToggleButton>
						</ToggleButtonGroup>
						{/* ==== FILTER BUTTON ==== */}

						{/* ALL TODOS */}
						{todosJsx}
						{/* === ALL TODOS === */}

						{/* INPUT + ADD BUTTON */}
						<Grid
							container
							style={{ marginTop: "20px" }}
							spacing={2}
						>
							<Grid
								xs={12}
								display="flex"
								justifyContent="space-around"
								alignItems="center"
								style={{ marginBottom: "15px" }}
							>
								<TextField
									style={{ width: "100%" }}
									id="outlined-basic"
									label="Task Title"
									variant="outlined"
									value={titleInput}
									onChange={(e) => {
										setTitleInput(e.target.value);
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											border: "3px solid black",
										},
										"& .MuiOutlinedInput-root:hover": {
											border: "3px solid black",
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "black",
											}
										},
										"& .MuiOutlinedInput-root.Mui-focused": {
											border: "3px solid black",
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "black",
											}
										},
										"& .MuiInputLabel-root": {
											color: "rgba(128, 128, 128, 0.7)",
											fontSize: "1.1rem",
											fontWeight: "normal",
										},
										"& .MuiInputLabel-root:hover": {
											color: "black",
											fontWeight: "bold",
										},
										"& .MuiInputLabel-root.Mui-focused": {
											color: "black",
											fontSize: "1.3rem",
											fontWeight: "bold",
										},
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "black",
										}
									}}
								/>
							</Grid>

							<Grid xs={12} style={{ marginBottom: "15px" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['TimePicker', 'TimePicker']}>
										<TimePicker
											label="Start time"
											value={startTime}
											onChange={(newValue) => setStartTime(newValue)}
											sx={{
												"& .MuiOutlinedInput-root": {
													border: "3px solid black",
												},
												"& .MuiOutlinedInput-root:hover": {
													border: "3px solid black",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "black",
													}
												},
												"& .MuiOutlinedInput-root.Mui-focused": {
													border: "3px solid black",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "black",
													}
												},
												"& .MuiInputLabel-root": {
													color: "rgba(128, 128, 128, 0.7)",
													fontSize: "1.1rem",
													fontWeight: "normal",
												},
												"& .MuiInputLabel-root:hover": {
													color: "black",
													fontWeight: "bold",
												},
												"& .MuiInputLabel-root.Mui-focused": {
													color: "black",
													fontSize: "1.3rem",
													fontWeight: "bold",
												},
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "black",
												}
											}}
										/>
										<TimePicker
											label="End time"
											value={endTime}
											onChange={(newValue) => setEndTime(newValue)}
											sx={{
												"& .MuiOutlinedInput-root": {
													border: "3px solid black",
												},
												"& .MuiOutlinedInput-root:hover": {
													border: "3px solid black",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "black",
													}
												},
												"& .MuiOutlinedInput-root.Mui-focused": {
													border: "3px solid black",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "black",
													}
												},
												"& .MuiInputLabel-root": {
													color: "rgba(128, 128, 128, 0.7)",
													fontSize: "1.1rem",
													fontWeight: "normal",
												},
												"& .MuiInputLabel-root:hover": {
													color: "black",
													fontWeight: "bold",
												},
												"& .MuiInputLabel-root.Mui-focused": {
													color: "black",
													fontSize: "1.3rem",
													fontWeight: "bold",
												},
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "black",
												}
											}}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</Grid>

							<Grid
								xs={12}
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<Button
									style={{ width: "100%", height: "100%" }}
									variant="contained"
									onClick={() => {
										handleAddClick();
									}}
									disabled={titleInput.length === 0}
									sx={{
										border: "3px solid black",
									}}
								>
									Add Task
								</Button>
							</Grid>
						</Grid>
						{/*== INPUT + ADD BUTTON ==*/}
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
