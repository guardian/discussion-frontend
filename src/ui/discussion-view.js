import CommentCount from '../ui/comment-count';
import Identity from '../ui/identity';
import { user } from '../model/proptypes';

const DiscussionView = function({
    anonymous,
    avatarImagesHost,
    closed,
    commentsCount,
    loading,
    profile,
    profileUrl,
    profileClientId
}) {
    return (
        <div className="container__meta">
            <CommentCount count={commentsCount} />
            <Identity
                anonymous={anonymous}
                avatarImagesHost={avatarImagesHost}
                closed={closed}
                loading={loading}
                profile={profile}
                profileUrl={profileUrl}
                profileClientId={profileClientId}
            />
        </div>
    );
};

DiscussionView.propTypes = {
    anonymous: React.PropTypes.bool,
    avatarImagesHost: React.PropTypes.string.isRequired,
    closed: React.PropTypes.bool,
    commentsCount: React.PropTypes.number,
    id: React.PropTypes.string,
    loading: React.PropTypes.bool.isRequired,
    profile: user,
    profileUrl: React.PropTypes.string.isRequired,
    profileClientId: React.PropTypes.string,
};

export default DiscussionView;
