import React, { useState, useEffect } from "react";
import {
	Avatar,
	Modal,
	Box,
	TextField,
	Button,
	Tabs,
	Tab,
} from "@mui/material";
import { SignUp } from "../auth/SignUp";
import { logIn } from "../auth/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthModal = () => {
	const [open, setOpen] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);
	const [avatar, setAvatar] = useState("?");
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("userId")
	);

	const notifyLoginStateChange = () => {
		window.dispatchEvent(new Event("loginStateChanged"));
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		setIsLoggedIn(!!userId);

		const storedUserInfo = localStorage.getItem("userInfo");
		if (storedUserInfo) {
			try {
				const userInfo = JSON.parse(storedUserInfo);
				if (userInfo?.username) {
					setAvatar(userInfo.username[0]?.toUpperCase() || "?");
				}
			} catch (error) {
				console.error("Error parsing userInfo:", error);
				setAvatar("?");
			}
		} else {
			setAvatar("?");
		}

		const handleStorageChange = () => {
			const newUserId = localStorage.getItem("userId");
			setIsLoggedIn(!!newUserId);

			const newUserInfo = localStorage.getItem("userInfo");
			if (newUserInfo) {
				try {
					const userInfo = JSON.parse(newUserInfo);
					if (userInfo?.username) {
						setAvatar(userInfo.username[0]?.toUpperCase() || "?");
					}
				} catch (error) {
					console.error("Error parsing userInfo:", error);
					setAvatar("?");
				}
			} else {
				setAvatar("?");
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleTabChange = (event, newValue) => setTabIndex(newValue);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (tabIndex === 0) {
			await logIn(formData);

			const userId = localStorage.getItem("userId");
			setIsLoggedIn(!!userId);

			const storedUserInfo = localStorage.getItem("userInfo");
			if (storedUserInfo) {
				try {
					const userInfo = JSON.parse(storedUserInfo);
					if (userInfo?.username) {
						setAvatar(userInfo.username[0]?.toUpperCase() || "?");
					}
				} catch (error) {
					console.error("Error parsing userInfo:", error);
				}
			}

			notifyLoginStateChange();
		} else {
			await SignUp(formData);
			if (localStorage.getItem("userId")) {
				notifyLoginStateChange();
			}
		}
		handleClose();
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userInfo");
		setIsLoggedIn(false);
		setAvatar("?");
		notifyLoginStateChange();
	};

	return (
		<>
			{isLoggedIn ? (
				<LogoutIcon onClick={handleLogout} />
			) : (
				<Avatar
					onClick={handleOpen}
					sx={{
						cursor: "pointer",
						color: "white",
						backgroundColor: "#1976d2",
						width: 30,
						height: 30,
					}}
				>
					{isLoggedIn ? avatar : "?"}
				</Avatar>
			)}
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 350,
						bgcolor: "#ffffff",
						p: 4,
						borderRadius: 2,
					}}
				>
					<Tabs
						value={tabIndex}
						onChange={handleTabChange}
						centered
						sx={{
							color: "black",
						}}
					>
						<Tab label="Sign In" />
						<Tab label="Sign Up" />
					</Tabs>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
						<TextField
							fullWidth
							label="Username"
							margin="normal"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							sx={{
								input: {
									color: "black",
								},
								label: {
									color: "black",
								},
							}}
						/>
						{tabIndex === 1 && (
							<TextField
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								sx={{
									input: {
										color: "black",
									},
									label: {
										color: "black",
									},
								}}
							/>
						)}
						<TextField
							fullWidth
							label="Password"
							type="password"
							margin="normal"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							sx={{
								input: {
									color: "black",
								},
								label: {
									color: "black",
								},
							}}
						/>
						<Button
							fullWidth
							variant="contained"
							sx={{
								mt: 2,
								backgroundColor: "#1976d2",
								color: "white",
							}}
							type="submit"
						>
							{tabIndex === 0 ? "Sign In" : "Sign Up"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default AuthModal;
