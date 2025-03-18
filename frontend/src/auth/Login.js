import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const logIn = (formData) => {
	axios
		.post(`${API_URL}/auth/login`, formData)
		.then((res) => {
			const userInfo = res.data.result;
			const userId = userInfo.id;
			if (!isNaN(userId)) {
				console.log(userId + " is a number");
				console.log(userInfo + " is a userInfo");
				localStorage.setItem("userId", `${userId}`);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
			}
		})
		.catch((c) => {
			if (c.response && c.response.data) {
				console.log(c.response.data);
			}
		});
};
