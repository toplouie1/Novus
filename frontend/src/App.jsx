import { BrowserRouter } from "react-router-dom";
import "./css/App.css";
import Nav from "./components/Nav";

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Nav />

				<div className="categories">
					<div className="category">For You</div>
					<div className="category">Technology</div>
					<div className="category">Business</div>
					<div className="category">Science</div>
					<div className="category">Sports</div>
					<div className="category">Entertainment</div>
				</div>

				<div className="news-container">
					<div className="news-grid">
						<div className="news-card">
							<img
								src="https://via.placeholder.com/300x200"
								alt="News thumbnail"
							/>
							<div className="news-content">
								<h3>Breaking News Title</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>
								<span className="source">Source Name</span>
							</div>
						</div>

						<div className="news-card">
							<img
								src="https://via.placeholder.com/300x200"
								alt="News thumbnail"
							/>
							<div className="news-content">
								<h3>Another News Story</h3>
								<p>
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<span className="source">Source Name</span>
							</div>
						</div>

						<div className="news-card">
							<img
								src="https://via.placeholder.com/300x200"
								alt="News thumbnail"
							/>
							<div className="news-content">
								<h3>Latest Updates</h3>
								<p>
									Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur.
								</p>
								<span className="source">Source Name</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
