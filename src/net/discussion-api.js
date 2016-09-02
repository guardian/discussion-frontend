import { getJson, jsonp } from '../utils/json';
import mediator from '../utils/mediator';
import { join } from '../utils/url';

export function create ({
    apiHost
}, get = getJson) {
    function commentCount (...ids) {
        const url = join(apiHost, 'getCommentCounts' + '?short-urls=' + ids.join(','));
        return get(url).catch(ex => {
            mediator.emit('error', 'comments-count', ex);
            throw ex;
        });
    }

    function userProfile (id = 'me') {
        const url = join(apiHost, '/profile/' + id);
        return jsonp(url)
        .then(response => {
            if (response.status !== 'ok') {
                throw new Error('Invalid user profile status: ' + response.status);
            } else {
                return response.userProfile;
            }
        })
        .catch(ex => {
            mediator.emit('error', 'user-profile', ex);
            throw ex;
        });
    }

    return {
        commentCount,
        userProfile
    };
}
