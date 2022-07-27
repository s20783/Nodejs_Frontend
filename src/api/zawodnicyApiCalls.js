import {getCurrentUser} from "../helpers/authHelper";

const zawodnicyURL = 'http://localhost:3000/zawodnicy/api';

export function getZawodnicyList(){
    const promise = fetch(zawodnicyURL);
    return promise;
}

export function getZawodnicyDetails(Id){
    const url = `${zawodnicyURL}/details/${Id}`;
    const promise = fetch(url);
    return promise;
}
export function getZawodnikInfo(Id){
    const url = `${zawodnicyURL}/${Id}`;
    const promise = fetch(url);
    return promise;
}

export function addZawodnik(data) {
    const zawodnik = JSON.stringify(data)
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
        body: zawodnik
    }
    const promise = fetch(`${zawodnicyURL}/add`, options);
    return promise;
}

export function updateZawodnik(id,data){
    const url = `${zawodnicyURL}/edit/${id}`
    const zawodnik = JSON.stringify(data)
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
        body: zawodnik
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteZawodnik(id){
    const url = `${zawodnicyURL}/delete/${id}`
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