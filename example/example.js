import CommentLoader from '../src/index';
import { unmountComponentAtNode } from 'react-dom';

const props = propsFromStorage({
    apiHost: '/api',
    profileUrl: 'https://profile.code.dev-theguardian.com',
    avatarImagesHost: 'https://avatar.guim.co.uk',
    discussionId: '1234',
    element: document.getElementById('comments-container'),
    profileClientId: 'comments'
});

const loadedComponents = [];
CommentLoader(props).then(() => {
    loadedComponents.push(props);
});
registerForChanges();


function propsFromStorage (base, provided) {
    try {
        const json = provided || JSON.parse(window.localStorage.getItem('discussion-frontend-example'));
        const user = (() => {
            if (json.provided) return {
                userId: '13975520',
                displayName: 'Fabio Crisci',
                privateFields: {
                    canPostComment: true
                }
            };
            if (json.banned) return {
                userId: '1245',
                displayName: 'Bad Troll',
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

function registerForChanges () {
    window.addEventListener('message', function(event) {
        try {
            const json = JSON.parse(event.data);
            loadedComponents.forEach(props => {
                unmountComponentAtNode(props.element);
                props.element.innerHTML = '';
                CommentLoader(propsFromStorage(props, json));
            });
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log('Invalid post message', ex);
        }
    });
}
