const allKeys = Array.prototype.slice.call(
    document.getElementsByClassName('option')
).map(element => element.getElementsByTagName('input')[0].id);

const frames = Array.prototype.slice.call(
    document.getElementsByTagName('iframe')
).map(frame => frame.contentWindow);

try {
    const json = JSON.parse(window.localStorage.getItem('discussion-frontend-example'));
    Object.keys(json).forEach(key => {
        if (json[key] === true) {
            document.getElementById(key).setAttribute('checked', '');
        }
    });
} catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex);
}

allKeys.forEach(key => {
    document.getElementById('anon').addEventListener('click', disable('provided', 'banned'));
    document.getElementById('provided').addEventListener('click', disable('anon', 'banned'));
    document.getElementById('banned').addEventListener('click', disable('anon', 'provided'));
    document.getElementById('react').addEventListener('click', disable('preact'));
    document.getElementById('preact').addEventListener('click', disable('react'));
    document.getElementById('react').addEventListener('click', reloadFrmaes);
    document.getElementById('preact').addEventListener('click', reloadFrmaes);
    document.getElementById('prod').addEventListener('click', reloadFrmaes);
    document.getElementById('article').addEventListener('click', reloadFrmaes);
    document.getElementById(key).addEventListener('click', saveToStorage);
});

function saveToStorage () {
    const json = {};
    allKeys.forEach(key => {
        json[key] = document.getElementById(key).checked;
    });
    const asString = JSON.stringify(json);
    window.localStorage.setItem('discussion-frontend-example', asString);
    frames.forEach(frame => frame.postMessage(asString, document.location));
}

function reloadFrmaes () {
    frames.forEach(frame => frame.location.reload());
}

function disable (...others) {
    return function() {
        others.forEach(key => document.getElementById(key).checked = false);
    };
}
