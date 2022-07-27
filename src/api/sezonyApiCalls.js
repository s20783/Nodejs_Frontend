import {getCurrentUser} from "../helpers/authHelper";

const sezonyURL = 'http://localhost:3000/sezony/api';

export function getSezonyList() {
    const promise = fetch(sezonyURL);
    return promise;
}

export function getSezonyDetails(Id) {
    const url = `${sezonyURL}/details/${Id}`;
    const promise = fetch(url);
    return promise;
}

export function getSezonyTable(Id) {
    const url = `${sezonyURL}/table/${Id}`;
    const promise = fetch(url);
    return promise;
}

export function addSezon(data) {
    const sezon = JSON.stringify(data)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: sezon
    }
    const promise = fetch(`${sezonyURL}/add`, options);
    return promise;
}

export function updateSezon(id, data) {
    const url = `${sezonyURL}/edit/${id}`
    const sezon = JSON.stringify(data)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: sezon
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteSezon(id) {
    const url = `${sezonyURL}/delete/${id}`
    const user = getCurrentUser()
    let token
    if (user && user.token) {
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