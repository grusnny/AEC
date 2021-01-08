
const API = 'https://ayudaencasa-usuarios-servicio.herokuapp.com';
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

    return response.json();
} 

async function deleteUser(request = {}) {
    const response = await fetch(REQUEST_API,{
        method: 'DELETE',
        headers: headers,
        body: request,
        redirect: 'follow'
      })

    return response.json();
} 

async function getUserById(id = "") {
    const response = await fetch(REQUEST_API+"/"+id, requestOptionsGet)

    return response.json(); 
} 

async function postUser(request = {}) {
    const response = await fetch(REQUEST_API, {
            method: 'POST',
            headers: headers,
            body: request,
            redirect: 'follow'
        })

    return response.json(); 
}   

async function getAllUsers() {
    const response = await fetch(REQUEST_API, requestOptionsGet)

    return response.json(); 
}   

export {getAllUsers,getUserById,postUser,updateUser,deleteUser}