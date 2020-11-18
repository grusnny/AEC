
const API = 'http://ayudaencasarequestcruddynamodb-env-1.eba-epiwqnup.us-east-1.elasticbeanstalk.com';
const REQUEST_API = API + '/requests';

var headers = new Headers();
headers.append('Content-Type', 'application/json');

var requestOptionsGet = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
 
async function updateRequest(request = {}) {
    const response = await fetch(REQUEST_API,{
        method: 'PUT',
        headers: headers,
        body: request,
        redirect: 'follow'
      })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response.json();
} 

async function deleteRequest(request = {}) {
    const response = await fetch(REQUEST_API,{
        method: 'DELETE',
        headers: headers,
        body: request,
        redirect: 'follow'
      })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response.json();
} 

async function getRequestById(id = "") {
    const response = await fetch(REQUEST_API+"/"+id, requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response.json(); 
} 

async function postRequest(request = {}) {
    const response = await fetch(REQUEST_API, {
            method: 'POST',
            headers: headers,
            body: request,
            redirect: 'follow'
        })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response.json(); 
}   

async function getAllRequests() {
    const response = await fetch(REQUEST_API, requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));    
    return response.json(); 
}   

export {getAllRequests,getRequestById,postRequest,updateRequest,deleteRequest}