const CommentCount = ({ count }) => {
    if (count) {
        return (
            <span>comments <span className="discussion__comment-count">({count})</span></span>
        );
    } else {
        return <span>comments</span>;
    }
};

CommentCount.propTypes = {
    count: React.PropTypes.number
};

export default CommentCount;
