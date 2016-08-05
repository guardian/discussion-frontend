export default function create ({
    discussionId,
    element
}) {
    ReactDOM.render(
        <span>Discussion {discussionId}</span>,
        element
    );
}
