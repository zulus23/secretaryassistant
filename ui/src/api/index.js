/* eslint-disable */
import axios from 'axios'

const  client = axios.create();
client.defaults.timeout = 1000 * 60 * 8;
let axiosConfig  =  () =>{
    return {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",

        },

    }
};


export function searchCompanyByName(searchData) {
    return client.post('/api/searchrequest',searchData, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function loadManager(codeCompany) {
    return client.post('/api/loadmanager',codeCompany, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function loadTechnicalSupport(codeCompany) {
    return client.post('/api/loadsupport',codeCompany, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function searchPhoneByCodeAndName(searchData) {
    return client.post('/api/searchphone',searchData, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}