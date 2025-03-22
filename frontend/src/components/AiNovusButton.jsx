import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const AiNovusButton = () => {
	const { isDark } = useTheme();
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		console.log("AiNovus button clicked");
		try {
			navigate("/aiNovus");
			console.log("Navigation attempted to /personalized-news");
		} catch (error) {
			console.error("Navigation error:", error);
		}
	};

	const StyledButton = styled(Button)(() => ({
		backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
		color: isDark ? "#ffffff" : "#1e1e1e",
		padding: "8px 16px",
		fontSize: "14px",
		fontWeight: "bold",
		textTransform: "none",
		borderRadius: "6px",
		boxShadow: isDark
			? "0 2px 8px rgba(0, 0, 0, 0.4)"
			: "0 2px 8px rgba(0, 0, 0, 0.1)",
		transition: "all 0.2s ease",
		border: isDark ? "1px solid #3a86ff" : "1px solid #4361ee",

		"&:hover": {
			backgroundColor: isDark ? "#3a3a3a" : "#ffffff",
			transform: "translateY(-2px)",
			boxShadow: isDark
				? "0 4px 12px rgba(0, 0, 0, 0.5)"
				: "0 4px 12px rgba(0, 0, 0, 0.15)",
		},

		"&:active": {
			transform: "translateY(1px)",
			boxShadow: isDark
				? "0 1px 4px rgba(0, 0, 0, 0.6)"
				: "0 1px 4px rgba(0, 0, 0, 0.2)",
		},
	}));

	return <StyledButton onClick={handleClick}>AiNovus</StyledButton>;
};

export default AiNovusButton;
