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
            if (response.counts && response.counts.length > 0) {
                const count = response.counts[0].count;
                mediator.emit('comment-count', count);
                return count;
            } else {
                return Promise.reject(new Error('Invalid comments count response'));
            }
        })
        .catch(ex => {
            mediator.emit('error', 'comments-count', ex);
        });
    }

    return {
        commentCount
    };
}
