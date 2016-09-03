import { render } from 'react-dom';
import Discussion from './model/discussion';
import mediator from './utils/mediator';
import { create as createApi } from './net/discussion-api.js';

export default function create ({
    /* Base host for discussion api */
    apiHost,
    /* Is the discussion closed for comments */
    closed,
    /* Discussion ID */
    discussionId,
    /* Element in which the discussion frontend is rendered */
    element,
    /* Custom net module, exports `json` and `jsonp` methods */
    net = {},
    /* Base path for profile service (signin, register) */
    profileUrl,
    /* User information, if null, it tries to get it from discussion API */
    user,
    /* Does the user have a valid guardian user cookie? If so it'll get the profile from API */
    userFromCookie
}) {
    const api = createApi({ apiHost, net });
    const component = (
        <Discussion
            id={discussionId}
            api={api}
            profileUrl={profileUrl}
            closed={closed}
            user={user}
            userFromCookie={userFromCookie}
        />
    );

    return new Promise(resolve => {
        render(
            component,
            element,
            () => resolve(mediator)
        );
    });
}
