import React from "react";

const articles = [
	{
		id: 1,
		title: "Understanding React",
		content: "React is a JavaScript library for building user interfaces.",
	},
	{
		id: 2,
		title: "Getting Started with JavaScript",
		content:
			"JavaScript is a versatile programming language used for web development.",
	},
	{
		id: 3,
		title: "Introduction to Web Development",
		content: "Web development involves building and maintaining websites.",
	},
];

const AiNovus = () => {
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Articles</h1>
			<ul style={{ listStyleType: "none", padding: 0 }}>
				{articles.map((article) => (
					<li key={article.id} style={{ marginBottom: "20px" }}>
						<h2>{article.title}</h2>
						<p>{article.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AiNovus;
