import CommentCount from '../ui/comment-count';
import Identity from '../ui/identity';
import sharedPropTypes from '../model/proptypes';

const DiscussionView = function({
    anonymous,
    closed,
    commentsCount,
    profile,
    profileUrl
}) {
    return (
        <div className="container__meta">
            <CommentCount count={commentsCount} />
            <Identity
                anonymous={anonymous}
                closed={closed}
                profile={profile}
                profileUrl={profileUrl}
            />
        </div>
    );
};

DiscussionView.propTypes = {
    anonymous: React.PropTypes.bool,
    closed: React.PropTypes.bool,
    commentsCount: React.PropTypes.number,
    id: React.PropTypes.string,
    profile: sharedPropTypes.user,
    profileUrl: React.PropTypes.string.isRequired
};

export default DiscussionView;
