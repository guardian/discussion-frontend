import CommentCount from '../ui/comment-count';
import sharedPropTypes from '../model/proptypes';

const DiscussionView = function({
    id,
    closed,
    commentsCount,
    profile,
    anonymous
}) {
    return (
        <CommentCount count={commentsCount} />
    );
};

DiscussionView.propTypes = {
    commentsCount: React.PropTypes.number,
    profile: sharedPropTypes.user,
    anonymous: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    closed: React.PropTypes.bool.isRequired
};

export default DiscussionView;
