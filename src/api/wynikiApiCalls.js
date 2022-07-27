import {getCurrentUser} from "../helpers/authHelper";

const klubyURL = 'http://localhost:3000/wyniki/api';

export function getWynikiList(){
    const promise = fetch(klubyURL);
    return promise;
}

export function getWynikiDetails(Id){
    const url = `${klubyURL}/details/${Id}`;
    const promise = fetch(url);
    return promise;
}
export function getWynikiAdd(){
    const url = `${klubyURL}/add`;
    const promise = fetch(url);
    return promise;
}
export function getWynikiEdit(Id){
    const url = `${klubyURL}/edit/${Id}`;
    const promise = fetch(url);
    return promise;
}

export function addWynik(data) {
    const wynik = JSON.stringify(data)
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
        body: wynik
    }
    const promise = fetch(`${klubyURL}/add`, options);
    return promise;
}

export function updateWynik(id,data){
    const url = `${klubyURL}/edit/${id}`
    const wynik = JSON.stringify(data)
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wynik
    }
    const promise = fetch(url, options);
    return promise;
}

export function goleDown(id1, id2){
    const url = `${klubyURL}/edit/goleDown/${id1}/${id2}`;
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: null
    }
    fetch(url, options);
}

export function goleUp(id1, id2){
    const url = `${klubyURL}/edit/goleUp/${id1}/${id2}`;
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: null
    }
    fetch(url, options);
}

export function asystyDown(id1, id2){
    const url = `${klubyURL}/edit/asystyDown/${id1}/${id2}`;
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: null
    }
    fetch(url, options);
}

export function asystyUp(id1, id2){
    const url = `${klubyURL}/edit/asystyUp/${id1}/${id2}`;
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: null
    }
    fetch(url, options);
}



export function deleteMecz(id){
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