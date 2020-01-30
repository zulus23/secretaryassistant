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


/*client.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    console.log('client.interceptors.response ---- ',error.response.data);
    return Promise.reject(error);
})*/


export function searchCompanyByName(searchData) {
    return client.post('/api/searchrequest',searchData, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
export function loadDetailRow(codeCompany) {
    return client.post('/api/loadDetail',codeCompany, axiosConfig()).catch(function (error)  {
        throw new Error(error.response.data.message.replace(/(["\"])/g,''));
    });
}
