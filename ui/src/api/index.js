/* eslint-disable */

import axios from 'axios'

const  client = axios.create();
client.defaults.timeout = 1000 * 60 * 8;
let axiosConfig  =  (token) =>{


    return {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Auth-Token": token

        },

    }
};
export function authentication(user) {
    return client.post('/api/login',user).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}




export function searchCompanyByName(searchData,token) {
    return client.post('/api/searchrequest',searchData, axiosConfig(token)).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function loadManager(codeCompany,token) {
    return client.post('/api/loadmanager',codeCompany, axiosConfig(token)).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function loadTechnicalSupport(codeCompany,token) {
    return client.post('/api/loadsupport',codeCompany, axiosConfig(token)).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function searchPhoneByCodeAndName(searchData,token) {
    return client.post('/api/searchphone',searchData, axiosConfig(token)).catch(function (error)  {

        throw new Error(error);
    });
}