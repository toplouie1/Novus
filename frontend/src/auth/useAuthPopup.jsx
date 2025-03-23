import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const useAuthPopup = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("info");

	const triggerPopup = (type) => {
		let msg = "";
		switch (type) {
			case "signin":
				msg = "Successfully signed in!";
				setSeverity("success");
				break;
			case "signup":
				msg = "Account created successfully!";
				setSeverity("success");
				break;
			case "signout":
				msg = "Signed out successfully!";
				setSeverity("info");
				break;
			default:
				msg = "Something happened!";
				setSeverity("warning");
		}

		setMessage(msg);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const AuthPopup = () => (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);

	return { triggerPopup, AuthPopup };
};

export default useAuthPopup;
