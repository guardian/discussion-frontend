import CommentCount from './ui/comment-count';

export default function create ({
    discussionId,
    element
}) {
    ReactDOM.render(
        <div>
            <p>Comment count without value: <CommentCount /></p>
            <p>Comment count with a value: <CommentCount count="12" /></p>
        </div>,
        element
    );
}
