import { getJson } from '../utils/json';
import mediator from '../utils/mediator';
import { join } from '../utils/url';

export function create ({
    apiHost
}, get = getJson) {
    function commentCount (...ids) {
        const url = join(apiHost, 'getCommentCounts' + '?short-urls=' + ids.join(','));
        return get(url)
        .then(response => {
            mediator.emit('comment-count', response);
            return response;
        })
        .catch(ex => {
            mediator.emit('error', 'comments-count', ex);
        });
    }

    return {
        commentCount
    };
}
