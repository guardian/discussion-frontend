import 'whatwg-fetch';

export function inject (Promise) {
    function json (path) {
        return fetch(path, {
            mode: 'cors'
        }).then(resp => {
            return resp.ok ? resp.json() : Promise.reject(new Error('fetch error: ' + resp.statusText));
        });
    }

    function jsonp (path) {
        return new Promise(function(resolve, reject) {
            const jsonpCallback = 'jp_' + Math.floor((Math.random() * 100)) + new Date().getTime();
            const jsonpPath = [path, 'callback=' + jsonpCallback].join(path.indexOf('?') === -1 ? '?' : '&');
            window[jsonpCallback] = resolve;
            const script = document.createElement('script');
            script.src = jsonpPath;
            script.onerror = function() {
                reject(new Error('JSONP network error on ' + jsonpPath));
            };
            document.head.appendChild(script);
        });
    }

    return { json, jsonp };
}
