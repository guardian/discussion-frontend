import CommentCount from '../ui/comment-count';
import Identity from '../ui/identity';
import CommentBox from '../ui/comment-box';
import { user } from '../model/proptypes';

const DiscussionView = function({
    anonymous,
    avatarImagesHost,
    children,
    closed,
    commentsCount,
    loading,
    profile,
    profileUrl, 
    profileClientId,
    api
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
            <CommentBox api={api} />
            {children}
        </div>
    );
};

DiscussionView.propTypes = {
    anonymous: React.PropTypes.bool,
    avatarImagesHost: React.PropTypes.string.isRequired,
    children: React.PropTypes.any,
    closed: React.PropTypes.bool,
    commentsCount: React.PropTypes.number,
    id: React.PropTypes.string,
    loading: React.PropTypes.bool.isRequired,
    profile: user,
    profileUrl: React.PropTypes.string.isRequired,
    profileClientId: React.PropTypes.string,
    api: React.PropTypes.shape({
        commentScore: React.PropTypes.func.isRequired
    }).isRequired,
};

export default DiscussionView;
