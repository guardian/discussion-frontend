import { render } from 'react-dom';
import Discussion from './model/discussion';
import mediator from './utils/mediator';
import { create as createApi } from './net/discussion-api.js';

export default function create ({
    apiHost,
    discussionId,
    element
}) {
    const api = createApi({ apiHost });

    return new Promise(resolve => {
        render(
            <Discussion
                id={discussionId}
                api={api}
            />,
            element,
            () => resolve(mediator)
        );
    });
}
