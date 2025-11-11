import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodosProvider from "./contexts/todosContext";
import { ToastProvider } from "./contexts/ToastContext";
const theme = createTheme({
	typography: {
		fontFamily: ["Alexandria"],
	},

	palette: {
		primary: {
			main: "#dd2c00",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<TodosProvider>
				<ToastProvider>
					<div
						className="App"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							background: "#191b1f",
							boxShadow: "5px 5px 15px rgba(255, 255, 255, 1)",
							height: "100vh",
							direction: "ltr",
						}}
					>
						<TodoList />
					</div>
				</ToastProvider>
			</TodosProvider>
		</ThemeProvider>
	);
}

export default App;
