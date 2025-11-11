import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { useTodosDispatch } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
	const dispatch = useTodosDispatch();
	const { showHideToast } = useToast();
	// const { showHideToast } = useContext(ToastContext);

	// EVENT HANDLERS
	function handleCheckClick() {
		dispatch({ type: "toggledCompleted", payload: todo });
		
		if (!todo.isCompleted) {
			showHideToast("Completed Successfully");
		}
	}

	function handleDeleteClick() {
		showDelete(todo);
	}

	function handleUpdateClick() {
		showUpdate(todo);
	}

	// ====== EVENT HANDLERS ======
	return (
		<>
			<Card
				className="todoCard"
				sx={{
					minWidth: { xs: 250, sm: 275 },
					maxWidth: "100%",
					background: "#000000ff",
					color: "white",
					marginTop: 5,
					padding: { xs: 1, sm: 2 }
				}}
			>
				<CardContent>
					<Grid container spacing={2} sx={{ alignItems: "center" }}>
						<Grid 
							xs={12} 
							sm={8} 
							md={8}
							display="flex"
							flexDirection="column"
							justifyContent="flex-start"
							alignItems="flex-start"
							sx={{ 
								textAlign: { xs: "center", sm: "left" },
								marginBottom: { xs: 2, sm: 0 }
							}}
						>
							<Typography
								variant="h5"
								sx={{
									textAlign: { xs: "center", sm: "left" },
									textDecoration: todo.isCompleted
										? "line-through"
										: "none",
									wordWrap: "break-word",
									width: "100%"
								}}
							>
								{todo.title}
							</Typography>

							<Typography
								variant="h6"
								sx={{ 
									textAlign: { xs: "center", sm: "left" },
									wordWrap: "break-word",
									width: "100%"
								}}
							>
								{todo.details}
							</Typography>

							{/* DISPLAY TIME INFORMATION */}
							{(todo.startTime || todo.endTime) && (
								<Typography
									variant="body2"
									sx={{ 
										textAlign: { xs: "center", sm: "left" },
										color: "#00b7ffff",
										marginTop: "8px",
										width: "100%"
									}}
								>
									{todo.startTime && `Start: ${todo.startTime.format('HH:mm')}`}
									{todo.startTime && todo.endTime && " | "}
									{todo.endTime && `End: ${todo.endTime.format('HH:mm')}`}
								</Typography>
							)}
						</Grid>

						{/* ACTION BUTTONS */}
						<Grid
							xs={12}
							sm={4}
							md={4}
							display="flex"
							flexDirection={{ xs: "row", sm: "row" }}
							justifyContent={{ xs: "center", sm: "space-around" }}
							alignItems="center"
							gap={{ xs: 1.5, sm: 0.5 }} 
							sx={{ marginTop: { xs: 1, sm: 0 } }}
						>
							{/* CHECK ICON BUTTON */}
							<IconButton
								onClick={() => {
									handleCheckClick();
								}}
								className="iconButton"
								aria-label="check"
								sx={{
									color: todo.isCompleted
										? "white"
										: "#88ff00ff",
									background: todo.isCompleted
										? "#88ff00ff"
										: "white",
									border: "solid  3px",
									bordercolor: "#88ff00ff",
									minWidth: { xs: "36px", sm: "40px" }, 
									minHeight: { xs: "36px", sm: "40px" },
									maxWidth: { xs: "40px", sm: "48px" }, 
									maxHeight: { xs: "40px", sm: "48px" },
									"& .MuiSvgIcon-root": {
										fontSize: { xs: "1rem", sm: "1.2rem" }
									}
								}}
							>
								<CheckIcon />
							</IconButton>
							{/*== CHECK ICON BUTTON ==*/}

							{/* UPDATE BUTTON */}
							<IconButton
								onClick={handleUpdateClick}
								className="iconButton"
								aria-label="update"
								sx={{
									color: "#008cffff",
									background: "white",
									bordercolor: "#008cffff",
									border: "solid 3px",
									minWidth: { xs: "36px", sm: "40px" },
									minHeight: { xs: "36px", sm: "40px" },
									maxWidth: { xs: "40px", sm: "48px" },
									maxHeight: { xs: "40px", sm: "48px" },
									"& .MuiSvgIcon-root": {
										fontSize: { xs: "1rem", sm: "1.2rem" }
									}
								}}
							>
								<ModeEditOutlineOutlinedIcon />
							</IconButton>
							{/*== UPDATE BUTTON ==*/}

							{/* DELETE BUTTON */}
							<IconButton
								className="iconButton"
								aria-label="delete"
								sx={{
									color: "#ff3e03ff",
									background: "white",
									bordercolor: "#ff3e03ff",
									border: "solid 3px",
									minWidth: { xs: "36px", sm: "40px" },
									minHeight: { xs: "36px", sm: "40px" },
									maxWidth: { xs: "40px", sm: "48px" },
									maxHeight: { xs: "40px", sm: "48px" },
									"& .MuiSvgIcon-root": {
										fontSize: { xs: "1rem", sm: "1.2rem" }
									}
								}}
								onClick={handleDeleteClick}
							>
								<DeleteOutlineOutlinedIcon />
							</IconButton>
							{/*=== DELETE BUTTON ===*/}
						</Grid>
						{/*== ACTION BUTTONS ==*/}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
