
const API = 'https://ayudaencasaworkercruddynamodb.herokuapp.com/';
const REQUEST_API = API + '/workers';

var headers = new Headers();
headers.append('Content-Type', 'application/json');

var requestOptionsGet = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
 
async function updateWorker(request = {}) {
    const response = await fetch(REQUEST_API,{
        method: 'PUT',
        headers: headers,
        body: request,
        redirect: 'follow'
      })

    return response.json();
} 

async function deleteWorker(request = {}) {
    const response = await fetch(REQUEST_API,{
        method: 'DELETE',
        headers: headers,
        body: request,
        redirect: 'follow'
      })

    return response.json();
} 

async function getWorkerById(id = "") {
    const response = await fetch(REQUEST_API+"/"+id, requestOptionsGet)

    return response.json(); 
} 

async function postWorker(request = {}) {
    const response = await fetch(REQUEST_API, {
            method: 'POST',
            headers: headers,
            body: request,
            redirect: 'follow'
        })

    return response.json(); 
}   

async function getAllWorkers() {
    const response = await fetch(REQUEST_API, requestOptionsGet)  

    return response.json(); 
}   

export {getAllWorkers,getWorkerById,postWorker,updateWorker,deleteWorker}