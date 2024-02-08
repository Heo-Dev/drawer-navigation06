import axiosInstance from './axiosAPI';

const axiosPost = async (url, data = {}) => {
    try {
            
        const response = await axiosInstance.post(url, data);

        if (response.status == 200) {
            return response.data;
        }
        
    } catch (error) {
        console.log('Error catched : ', error);
    }
}
export default axiosPost;