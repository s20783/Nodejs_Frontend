import {getCurrentUser} from "../helpers/authHelper";
const klubyURL = 'http://localhost:3000/klub_zawodnik/api';

export function getKlub_zawodnikList(){
    const promise = fetch(klubyURL);
    return promise;
}

export function getKlub_zawodnikDetails(ID_klub, ID_zawodnik){
    const url = `${klubyURL}/details/${ID_klub}/${ID_zawodnik}`;
    const promise = fetch(url);
    return promise;
}

export function getKlub_zawodnikEdit(ID_klub_zawodnik){
    const url = `${klubyURL}/edit/${ID_klub_zawodnik}`;
    const promise = fetch(url);
    return promise;
}

export function getKlub_zawodnikAdd(){
    const url = `${klubyURL}/add`;
    const promise = fetch(url);
    return promise;
}

export function addKlub_zawodnik(data) {
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

export function updateKlub_zawodnik(id,data){
    const url = `${klubyURL}/edit/${id}`
    const klub = JSON.stringify(data)
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
        body: klub
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteKlub_zawodnik(id){
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