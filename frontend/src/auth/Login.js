import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const logIn = async (formData) => {
	try {
		const res = await axios.post(`${API_URL}/auth/login`, formData);
		const userInfo = res.data.result;
		const userId = userInfo.id;

		if (!isNaN(userId)) {
			localStorage.setItem("userId", `${userId}`);
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			return { success: true };
		} else {
			console.log("Invalid userId received.");
			return { success: false };
		}
	} catch (c) {
		if (c.response && c.response.data) {
			console.log("Login error:", c.response.data);
		}
		return { success: false, error: c.response?.data };
	}
};
