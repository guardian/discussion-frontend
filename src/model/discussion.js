import DiscussionView from '../ui/discussion-view';
import StickyBanner from '../ui/sticky-banner/banner.js';
import StickyTopBanner from '../ui/sticky-banner/top-banner.js';
import mediator from '../utils/mediator';
import { user } from '../model/proptypes';

class Discussion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            anonymous: true,
            commentsCount: 0,
            loading: true,
            profile: null
        };
        this.api = this.props.api;
    }

    componentDidMount () {
        this.getCommentCount();
        this.getUser();
    }

    getCommentCount () {
        const { id } = this.props;

        this.api.commentCount(id)
        .then(counts => {
            const value = counts[id] || 0;
            this.setState({ commentsCount: value }, () => {
                mediator.emit('comment-count', value);
            });
        });
    }

    getUser () {
        const { user, userFromCookie } = this.props;
        if (userFromCookie) {
            this.api.userProfile().then((profile) => {
                this.setState({ profile: profile, anonymous: false , loading: false});
            });
        } else if (user) {
            this.setState({ profile: user, anonymous: false, loading: false });
        } else {
            this.setState({ anonymous: true, loading: false });
        }
    }

    whenLoaded (condition, component) {
        // Return the component only when the state is loaded and the condition is met
        if (condition && this.state.loading === false) {
            return component;
        }
    }

    render () {
        const {
            avatarImagesHost,
            id,
            closed,
            profileUrl,
            profileClientId,
            featureStickyBanner,
            featureStickyBannerDismissable,
            featureTopBanner,
        } = this.props;
        const commentsCount = this.state.commentsCount;

        const features = [
            this.whenLoaded(featureStickyBanner && commentsCount >= 5,
                <StickyBanner
                    key="banner"
                    commentsCount={commentsCount}
                    dismissable={featureStickyBannerDismissable}
                />
            ),
            this.whenLoaded(featureTopBanner && commentsCount >= 5,
                <StickyTopBanner
                    key="top-banner"
                    commentsCount={commentsCount}
                />
            )
        ];

        return (
            <DiscussionView
                {...this.state}
                avatarImagesHost={avatarImagesHost}
                id={id}
                closed={closed}
                profileUrl={profileUrl}
                profileClientId={profileClientId}
            >
                {features}
            </DiscussionView>
        );
    }
}

Discussion.propTypes = {
    id: React.PropTypes.string.isRequired,
    api: React.PropTypes.shape({
        commentCount: React.PropTypes.func.isRequired,
        userProfile: React.PropTypes.func.isRequired
    }).isRequired,
    avatarImagesHost: React.PropTypes.string.isRequired,
    featureStickyBanner: React.PropTypes.bool,
    featureStickyBannerDismissable: React.PropTypes.bool,
    featureTopBanner: React.PropTypes.bool,
    profileUrl: React.PropTypes.string.isRequired,
    profileClientId: React.PropTypes.string,
    user: user,
    userFromCookie: React.PropTypes.bool,
    closed: React.PropTypes.bool.isRequired
};

export default Discussion;
