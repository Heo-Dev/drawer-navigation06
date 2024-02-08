import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://stg.benefitplus.kr/api",
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;


