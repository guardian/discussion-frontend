import CommentCount from '../ui/comment-count';
import Identity from '../ui/identity';
import { user } from '../model/proptypes';

const DiscussionView = function({
    anonymous,
    closed,
    commentsCount,
    loading,
    profile,
    profileUrl
}) {
    return (
        <div className="container__meta">
            <CommentCount count={commentsCount} />
            <Identity
                anonymous={anonymous}
                closed={closed}
                loading={loading}
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
    loading: React.PropTypes.bool.isRequired,
    profile: user,
    profileUrl: React.PropTypes.string.isRequired
};

export default DiscussionView;
