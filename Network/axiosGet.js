import axiosInstance from './axiosAPI';
// import axios from 'axios';

import {showAlert} from '../comm_module';

const axiosGet = async (token, url, params = {}) => {


    // console.log('axiosGet = [' + url + '], params = ', params);
    
    let config = {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
        params: params,
    }

    // axios.get('http://stg.benefitplus.kr/api' + url, config)
    // .then(response => {
    //     console.log('axiosGet data receive = ', response.data);
    //     return response.data;
    // })
    // .catch(error => {
    //     throw new Error(url + ' : ' + error);
    // });

    try {

        const response = await axiosInstance.get(url, config);
        
        if (response.status == 200) {
            // console.log('axiosGet data receive = ', response.data);
            return response.data;
        }

    }catch(error){
        // console.log('axiosPost error : ', error.response.status, error.message, error.response.data.result_msg);
        showAlert('error', error.response.data.result_msg);
        throw new Error(error.response.data.result_msg);
    }

    // try {

    //     const response = await fetch('http://stg.benefitplus.kr/api' + url, config);
        
    //     if (!response.ok) {
    //         throw new Error(url + ' : ',  response );
    //     }
    //     const data = await response.json();
    //     return data;

    // }catch (error) {
    //     throw new Error(url + ' : ' + error);
    // }
}

export default axiosGet;
