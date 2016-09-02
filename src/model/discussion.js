import DiscussionView from '../ui/discussion-view';
import mediator from '../utils/mediator';
import sharedPropTypes from '../model/proptypes';

class Discussion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            commentsCount: 0,
            profile: null,
            anonymous: true
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
                this.setState({ profile: profile, anonymous: false });
            });
        } else if (user) {
            this.setState({ profile: user, anonymous: false });
        } else {
            this.setState({ anonymous: true });
        }
    }

    render () {
        return (
            <DiscussionView
                {...this.state}
                id={this.props.id}
                closed={this.props.closed}
                profileUrl={this.props.profileUrl}
            />
        );
    }
}

Discussion.propTypes = {
    id: React.PropTypes.string.isRequired,
    api: React.PropTypes.shape({
        commentCount: React.PropTypes.func.isRequired,
        userProfile: React.PropTypes.func.isRequired
    }).isRequired,
    profileUrl: React.PropTypes.string.isRequired,
    user: sharedPropTypes.user,
    userFromCookie: React.PropTypes.bool,
    closed: React.PropTypes.bool.isRequired
};

export default Discussion;
