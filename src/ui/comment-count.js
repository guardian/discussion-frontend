export default commentCount;
function commentCount ({ count }) {
    if (count) {
        return (
            <span>comments <span className="discussion__comment-count">({count})</span></span>
        );
    } else {
        return <span>comments</span>;
    }
}

commentCount.displayName = 'CommentCount';
commentCount.propTypes = {
    count: React.PropTypes.number
};
