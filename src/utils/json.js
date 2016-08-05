export function get (path) {
    return fetch(path, {
        mode: 'cors'
    }).then(resp => {
        return resp.ok ? resp.json() : Promise.reject(new Error('fetch error: ' + resp.statusText));
    });
}
