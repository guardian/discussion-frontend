export function getJson (path, includeCredentials) {
    return fetch(path, {
        mode: 'cors',
        credentials: includeCredentials ? 'include' : 'same-origin'
    }).then(resp => {
        return resp.ok ? resp.json() : Promise.reject(new Error('fetch error: ' + resp.statusText));
    });
}
