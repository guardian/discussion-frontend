import CommentCount from '../ui/comment-count';
import mediator from '../utils/mediator';

class Discussion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            commentsCount: 0
        };
        this.api = this.props.api;
    }

    componentDidMount () {
        this.api.commentCount(this.props.id)
        .then(counts => {
            const value = counts[this.props.id];
            this.setState({ commentsCount: value }, () => {
                mediator.emit('comment-count', value);
            });
        });
    }

    render () {
        return (
            <CommentCount count={this.state.commentsCount} />
        );
    }
}

Discussion.propTypes = {
    id: React.PropTypes.string.isRequired,
    api: React.PropTypes.shape({
        commentCount: React.PropTypes.func.isRequired
    }).isRequired
};

export default Discussion;
