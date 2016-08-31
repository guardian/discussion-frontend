import CommentLoader from '../src/index';

const loadedComponents = [];
controlsFromStorage();

[
    'comments-container-large',
    'comments-container-portrait',
    'comments-container-landscape'
].forEach(element => {
    const props = propsFromStorage({
        apiHost: '/api',
        discussionId: '1234',
        element: document.getElementById(element)
    });

    CommentLoader(props).then(() => {
        loadedComponents.push(props);
    });
});

function propsFromStorage (base) {
    try {
        const json = JSON.parse(window.localStorage.getItem('discussion-frontend-example'));
        return Object.assign(base, json);
    } catch (ex) {
        return base;
    }
}

function controlsFromStorage () {
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

    const allKeys = ['closed'];

    allKeys.forEach(key => {
        document.getElementById(key).addEventListener('click', saveToStorage);
    });

    function saveToStorage () {
        const json = {};
        allKeys.forEach(key => {
            json[key] = document.getElementById(key).checked;
        });
        loadedComponents.forEach(props => {
            CommentLoader(Object.assign({}, props, json));
        });
        window.localStorage.setItem('discussion-frontend-example', JSON.stringify(json));
    }
}
