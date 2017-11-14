import axios from 'axios'
const ENDPOINT = "https://graph.facebook.com/v2.11/"
export const Network = {
    getDataFromApi(query,params,successCallBack,errorCallBack,method)
    {
        let link = ENDPOINT + query
        if (typeof successCallBack !== 'function') {
            successCallBack = function () { }
        }
        if (typeof errorCallBack !== 'function') {
            errorCallBack = function () { }
        }
        return axios({
            method : !method?'GET':method,
            url : link,
            data : params,
        })
        .then(res => {
            console.log(res.data);
            return successCallBack(res.data);
        })
        .catch(err => {
            console.log(err.response);
            return errorCallBack(err.response);
        })  
    }
}