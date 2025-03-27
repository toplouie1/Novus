import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const SignUp = async (formData) => {
	try {
		await axios.post(`${API_URL}/auth/sign_up`, formData);
		return { success: true };
	} catch (c) {
		if (c.response) {
			console.log("Sign Up error:", c.response.data);
		}
		return { success: false, error: c.response?.data };
	}
};
