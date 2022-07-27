import {getCurrentUser} from "../helpers/authHelper";

const klubyURL = 'http://localhost:3000/kluby/api';

export function getKlubyList(){
    const promise = fetch(klubyURL);
    return promise;
}

export function getKlubDetails(Id){
    const url = `${klubyURL}/details/${Id}`;
    const promise = fetch(url);
    return promise;
}
export function getKlubInfo(Id){
    const url = `${klubyURL}/${Id}`;
    const promise = fetch(url);
    return promise;
}

export function addKlub(data) {
    const klub = JSON.stringify(data)
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: klub
    }
    const promise = fetch(`${klubyURL}/add`, options);
    return promise;
}

export function updateKlub(id,data){
    const url = `${klubyURL}/edit/${id}`
    const klub = JSON.stringify(data)
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    console.log(token)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: klub
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteKlub(id){
    const url = `${klubyURL}/delete/${id}`
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: null
    }
    const promise = fetch(url, options);
    return promise;
}