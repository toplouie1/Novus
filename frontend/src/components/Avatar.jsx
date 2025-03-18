import React, { useState } from "react";
import {
	Avatar,
	Modal,
	Box,
	TextField,
	Button,
	Tabs,
	Tab,
} from "@mui/material";

const AuthModal = () => {
	const [open, setOpen] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

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

	const handleSubmit = (event) => {
		event.preventDefault();

		if (tabIndex === 0) {
			console.log("Sign In data:", formData);
		} else {
			console.log("Sign Up data:", formData);
		}
		handleClose();
	};

	return (
		<>
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
				?
			</Avatar>
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
