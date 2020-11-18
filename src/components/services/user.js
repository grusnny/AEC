
const API = 'http://ayudaencasausercruddynamodb-env.eba-nrqsnvkd.us-east-1.elasticbeanstalk.com/';
const REQUEST_API = API + '/users';

var headers = new Headers();
headers.append('Content-Type', 'application/json');

var requestOptionsGet = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
 
async function updateUser(request = {}) {
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

async function deleteUser(request = {}) {
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

async function getUserById(id = "") {
    const response = await fetch(REQUEST_API+"/"+id, requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response.json(); 
} 

async function postUser(request = {}) {
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

async function getAllUsers() {
    const response = await fetch(REQUEST_API, requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));    
    return response.json(); 
}   

export {getAllUsers,getUserById,postUser,updateUser,deleteUser}