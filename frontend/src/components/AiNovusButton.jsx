import Button from "@mui/material/Button";
import { styled, keyframes } from "@mui/material/styles";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AiNovusButton = () => {
	const { isDark } = useTheme();
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		console.log("AiNovus button clicked");
		try {
			navigate("/aiNovus");
			console.log("Navigation attempted to /aiNovus");
		} catch (error) {
			console.error("Navigation error:", error);
		}
	};

	const StyledButton = styled(Button)(() => ({
		background: isDark
			? "linear-gradient(45deg, #0d47a1, #00bcd4, #1a237e, #ff9800, #e0f7fa, #0288d1, #01579b)"
			: "linear-gradient(45deg, #1565c0, #4fc3f7, #283593, #ff9800, #ffffff, #29b6f6, #0277bd)",
		backgroundSize: "600% 600%",
		animation: `${gradientAnimation} 12s ease infinite`,
		color: "#ffffff",
		padding: "8px 16px",
		fontSize: "14px",
		fontWeight: "bold",
		textTransform: "none",
		borderRadius: "6px",
		boxShadow: isDark
			? "0 2px 8px rgba(0, 0, 0, 0.4)"
			: "0 2px 8px rgba(0, 0, 0, 0.1)",
		transition: "all 0.2s ease",

		"&:hover": {
			filter: "brightness(1.1)",
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
