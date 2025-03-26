import { useState } from "react";
import { summarizeArticle } from "../services/novusAi";
import { Modal, Box, Button, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

const ChildModal = ({ justification }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Button onClick={handleOpen} sx={{ mt: 2 }}>
				Why this rating?
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
			>
				<Box sx={{ ...style, width: 350 }}>
					<Typography id="child-modal-title" variant="h6">
						Justification
					</Typography>
					<Typography variant="body1">{justification}</Typography>
					<Button onClick={handleClose} sx={{ mt: 2 }}>
						Close
					</Button>
				</Box>
			</Modal>
		</>
	);
};

const SummarizeButton = ({ article }) => {
	const [summaryData, setSummaryData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSummarize = async () => {
		setLoading(true);
		const data = await summarizeArticle(article);
		setSummaryData(data);
		setLoading(false);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const summaryText = summaryData?.summary || "No summary available.";
	const rating = summaryData?.rating || 0;
	const justification =
		summaryData?.justification || "No justification available.";

	return (
		<>
			<Button onClick={handleSummarize} disabled={loading} variant="contained">
				{loading ? "Summarizing..." : "Summarize"}
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
			>
				<Box sx={style}>
					<Typography id="parent-modal-title" variant="h6">
						Article Summary
					</Typography>
					<Typography variant="body1">
						<strong>Summary:</strong> {summaryText}
					</Typography>
					<Typography variant="body1" sx={{ mt: 2 }}>
						<strong>Rating:</strong>{" "}
						{"★".repeat(rating) + "☆".repeat(5 - rating)}
					</Typography>
					<ChildModal justification={justification} />
					<Button onClick={handleClose} sx={{ mt: 2 }}>
						Close
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default SummarizeButton;
