import React, { useState, useContext } from "react";

import axiosInstance from './axiosAPI';


const axiosGet = async (token, url, parmas = {}) => {

    try {
        console.log(token.access_token);
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
            params: parmas,
        });

        if (response.status == 200) {
            return response.data;
        }

    }catch(error){
        console.log (error);
    }
}
export default axiosGet;
