import Discussion from './model/discussion';
import mediator from './utils/mediator';

export default function create ({
    discussionId,
    element
}) {
    return new Promise(resolve => {
        ReactDOM.render(
            <Discussion
                id={discussionId}
                commentsCountApi="/comments-count.json"
            />,
            element,
            () => resolve(mediator)
        );
    });
}
