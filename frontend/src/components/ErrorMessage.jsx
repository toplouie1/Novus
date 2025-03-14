const ErrorMessage = ({ message, onRetry }) => {
	return (
		<div className="error-container">
			<p className="error-message">{message}</p>
			{onRetry && (
				<button className="retry-button" onClick={onRetry}>
					Try Again
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;
