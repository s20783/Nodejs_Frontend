const baseURL = 'http://localhost:3000/api/auth'

export function loginCall(user) {
    const url = `${baseURL}/login`
    const userString = JSON.stringify(user)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userString
    }
    const promise = fetch(url, options)
    return promise;
}

