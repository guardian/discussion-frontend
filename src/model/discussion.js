import CommentCount from '../ui/comment-count';

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
            this.setState({ commentsCount: counts[this.props.id] });
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
