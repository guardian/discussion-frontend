import { render } from 'react-dom';
import Discussion from './model/discussion';
import mediator from './utils/mediator';
import { create as createApi } from './net/discussion-api.js';

export default function create ({
    apiHost,
    profileUrl,
    discussionId,
    closed,
    element,
    user,
    userFromCookie
}) {
    const api = createApi({ apiHost });
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
