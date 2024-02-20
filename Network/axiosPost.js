import axiosInstance from './axiosAPI';

import {showAlert} from '../comm_module';

const axiosPost = async (url, data = {}) => {
    try {
            
        const response = await axiosInstance.post(url, data);

        if (response.status == 200) {
            return response;
        }else if (response.status) {
            console.log(response);
        }
        
    } catch (error) {

        // console.log('axiosPost error : ', error.response.status, error.message, error.response.data.result_msg);
        showAlert('error', error.response.data.result_msg);
        throw new Error(error.response.data.result_msg);
    }
}
export default axiosPost;