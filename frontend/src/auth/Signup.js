import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const SignUp = (formData) => {
	axios
		.post(`${API_URL}/auth/sign_up`, formData)
		.then(() => {
			console.log("Sign Up successful");
		})
		.catch((c) => {
			if (c.response) {
				console.log(c.response.data);
			}
		});
};
