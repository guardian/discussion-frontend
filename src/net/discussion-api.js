import { inject } from '../utils/net';
import mediator from '../utils/mediator';
import { join } from '../utils/url';

export function create ({
    apiHost,
    net,
    Promise
}) {
    const defaultNet = inject(Promise);
    const {json = defaultNet.json, jsonp = defaultNet.jsonp, jsonForm = defaultNet.jsonForm} = net;

    function commentCount (...ids) {
        const url = join(apiHost, 'getCommentCounts' + '?short-urls=' + ids.join(','));
        return json(url).catch(ex => {
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

    function commentScore (body) {
      const url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' + 'API_KEY';
      const data = {
        comment: { text: body },
        requestedAttributes: { TOXICITY: {}}
      };

      return jsonForm(url, data)
      .then(response => {
        alert(JSON.stringify(response));
        return response;
      })
      .catch(ex => {
        throw ex;
      });
    }

    return {
        commentCount,
        userProfile,
        commentScore
    };
}
