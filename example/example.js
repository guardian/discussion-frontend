import CommentLoader from '../src/index';
import { unmountComponentAtNode } from 'react-dom';

const loadedComponents = [];
const allKeys = ['closed', 'anon', 'banned', 'provided'];
controlsFromStorage();

[
    // 'comments-container-large',
    // 'comments-container-portrait',
    'comments-container-landscape'
].forEach(element => {
    const props = propsFromStorage({
        apiHost: '/api',
        profileUrl: 'https://profile.code.dev-theguardian.com',
        discussionId: '1234',
        element: document.getElementById(element),
        profileClientId: 'comments'
    });

    CommentLoader(props).then(() => {
        loadedComponents.push(props);
    });
});

function propsFromStorage (base, provided) {
    try {
        const json = provided || JSON.parse(window.localStorage.getItem('discussion-frontend-example'));
        const user = (() => {
            if (json.provided) return {
                privateFields: {
                    canPostComment: true
                }
            };
            if (json.banned) return {
                privateFields: {
                    canPostComment: false
                }
            };
            return null;
        })();

        return Object.assign({}, base, json, {
            user: user,
            userFromCookie: json.anon ? false : !user
        });
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

    allKeys.forEach(key => {
        document.getElementById('anon').addEventListener('click', disable('provided', 'banned'));
        document.getElementById('provided').addEventListener('click', disable('anon', 'banned'));
        document.getElementById('banned').addEventListener('click', disable('anon', 'provided'));
        document.getElementById(key).addEventListener('click', saveToStorage);
    });

    function saveToStorage () {
        const json = {};
        allKeys.forEach(key => {
            json[key] = document.getElementById(key).checked;
        });
        loadedComponents.forEach(props => {
            unmountComponentAtNode(props.element);
            props.element.innerHTML = '';
            CommentLoader(propsFromStorage(props, json));
        });
        window.localStorage.setItem('discussion-frontend-example', JSON.stringify(json));
    }

    function disable (...others) {
        return function() {
            others.forEach(key => document.getElementById(key).checked = false);
        };
    }
}
